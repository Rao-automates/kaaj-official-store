export const trackEvent = (eventName: string, data: any = {}) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  }
};

export const trackGAEvent = (eventName: string, data: any = {}) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, data);
  }
};
