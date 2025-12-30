import { onMounted } from "vue";

export const useGaEvent = () => {
  let gaReady = false;

  onMounted(() => {
    gaReady = true;
  });

  const gaEvent = (...args: any[]) => {
    if (!gaReady || !process.client) return;
    const anyWindow = window as any;

    if (typeof anyWindow.gtag === "function") {
      anyWindow.gtag(...args);
      return;
    }

    if (typeof anyWindow.ga === "function") {
      anyWindow.ga(...args);
    }
  };

  return { gaEvent };
};
