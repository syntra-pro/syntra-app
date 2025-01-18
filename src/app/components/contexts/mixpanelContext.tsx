'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIX!;
const MixpanelContext = createContext<any>(null);

export const MixpanelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    mixpanel.init(MIXPANEL_TOKEN, { debug: true });
    setIsInitialized(true);
  }, []);

  const trackEvent = (event: string, props?: Record<string, any>) => {
    if (isInitialized) {
      mixpanel.track(event, props);
    }
  };

  const identifyUser = (userId: string, props?: Record<string, any>) => {
    if (isInitialized) {
      mixpanel.identify(userId);
      if (props) {
        mixpanel.people.set(props);
      }
    }
  };

  return (
    <MixpanelContext.Provider value={{ trackEvent, identifyUser }}>
      {children}
    </MixpanelContext.Provider>
  );
};

export const useMixpanel = () => useContext(MixpanelContext);
