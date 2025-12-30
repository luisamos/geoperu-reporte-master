export const usePdf = () => {
  const getMarginPx = (margin: number | string) => {
    const numericMargin = Number(margin || 0);
    return numericMargin * 28.3465; // cm to px
  };

  const imageToPdf = async (
    imageData: string,
    page: string | undefined = "a3",
    margin: number | string = 0
  ) => {
    let JsPDF: any = null;
    try {
      const module = await import(
        /* @vite-ignore */ "https://cdn.skypack.dev/jspdf"
      );
      JsPDF = module.jsPDF || module.default;
    } catch (error) {
      console.error("jsPDF no disponible", error);
    }

    if (!JsPDF) {
      const fallback = {
        save(fileName?: string) {
          if (!process.client) return;
          const link = document.createElement("a");
          link.href = imageData;
          link.download = fileName || "reporte.pdf";
          link.click();
        },
      };

      return fallback;
    }

    const doc = new JsPDF({
      orientation: "landscape",
      unit: "px",
      format: (page || "a3").toLowerCase(),
      hotfixes: ["px_scaling"],
    });

    const marginPx = getMarginPx(margin);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const availableWidth = pageWidth - marginPx * 2;
    const availableHeight = pageHeight - marginPx * 2;

    const imgProps = doc.getImageProperties(imageData);
    const ratio = Math.min(
      availableWidth / imgProps.width,
      availableHeight / imgProps.height
    );
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    doc.addImage(
      imageData,
      "PNG",
      marginPx,
      marginPx,
      imgWidth,
      imgHeight,
      undefined,
      "FAST"
    );

    return doc;
  };

  return { imageToPdf };
};
