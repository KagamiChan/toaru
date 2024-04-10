'use client';

import { I18nextProvider } from 'react-i18next';
import {initTranslations} from '~/i18n';
import { type Resource, createInstance } from 'i18next';
import { type FC, type PropsWithChildren } from 'react';

interface I18nProviderProps extends PropsWithChildren {
  locale: string;
  namespaces: string[];
  resources: Resource;
}

export const I18nProvider: FC<I18nProviderProps> = ({
  children,
  locale,
  namespaces,
  resources
}) => {
  const i18n = createInstance();

  void initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
