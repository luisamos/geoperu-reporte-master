import type { Ref } from "vue";

const cmToPixels = (cm: number) => cm * 37.7952755906;

const serializeSvg = (svgElement: SVGElement) => {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgElement);
};

const svgToCanvas = (svgElement: SVGElement) => {
  const clonedSvg = svgElement.cloneNode(true) as SVGElement;
  const svgString = serializeSvg(clonedSvg);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  return new Promise<{ canvas: HTMLCanvasElement; svgElement: SVGElement }>(
    (resolve) => {
      const image = new Image();
      image.onload = () => {
        const rect = svgElement.getBoundingClientRect();
        const canvas = document.createElement("canvas");
        canvas.width = rect.width || image.width;
        canvas.height = rect.height || image.height;
        const context = canvas.getContext("2d");
        context?.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve({ canvas, svgElement });
      };

      image.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ canvas: document.createElement("canvas"), svgElement });
      };

      image.src = url;
    }
  );
};

export const useScreenshot = () => {
  const formatSvgThenScreenShot = async (
    svgElements: any,
    mainElement: HTMLElement | null,
    marginCm?: Ref<number | string> | number | string
  ): Promise<string | null> => {
    if (!process.client || !mainElement) return null;

    let html2canvas: any;

    try {
      html2canvas = (await import("html2canvas")).default;
    } catch (error) {
      try {
        // @vite-ignore
        html2canvas = (await import("https://cdn.skypack.dev/html2canvas"))
          .default;
      } catch (cdnError) {
        console.error("html2canvas no disponible", error, cdnError);
        return null;
      }
    }
    const elements: SVGElement[] = svgElements?.toArray
      ? svgElements.toArray()
      : Array.from(svgElements || []).filter(
          (el: Element) => el instanceof SVGElement
        );

    const conversions = await Promise.all(
      elements.map((element) => svgToCanvas(element))
    );
    conversions.forEach(({ canvas, svgElement }) => {
      if (svgElement?.parentNode && canvas) {
        svgElement.classList.add("screenshot-hidden");
        svgElement.parentNode.insertBefore(canvas, svgElement.nextSibling);
      }
    });

    const marginValue =
      typeof marginCm === "object" && marginCm !== null && "value" in marginCm
        ? Number((marginCm as Ref<any>).value || 0)
        : Number(marginCm || 0);

    const canvas = await html2canvas(mainElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      windowWidth: mainElement.scrollWidth + cmToPixels(marginValue),
    });

    conversions.forEach(({ canvas, svgElement }) => {
      if (canvas?.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      svgElement?.classList.remove("screenshot-hidden");
    });

    return canvas.toDataURL("image/png");
  };

  return { formatSvgThenScreenShot };
};
