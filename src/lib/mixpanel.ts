import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIX!;

export const initMixpanel = () => {
  mixpanel.init(MIXPANEL_TOKEN, { debug: true });
};

export const trackEvent = (event: string, props?: Record<string, any>) => {
  mixpanel.track(event, props);
};

export const identifyUser = (userId: string, props?: Record<string, any>) => {
  mixpanel.identify(userId);
  if (props) {
    mixpanel.people.set(props);
  }
};
