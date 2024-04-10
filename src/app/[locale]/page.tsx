import { Trans } from "react-i18next/TransWithoutContext";
import { initTranslations } from "~/i18n";
import { Generator } from "./generator";
import { LanguageSelect } from "~/components/language-select";
import { I18nProvider } from "~/components/i18n-provider";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, ["common"]);
  return (
    <I18nProvider locale={locale} namespaces={["common"]} resources={resources}>
      <main className="flex min-h-screen flex-col items-center">
        <Generator />
        <LanguageSelect />
        <div className="text-center">
          <p>
            <Trans t={t} i18nKey="attributionMessage">
              This site is based on{" "}
              <a href="https://tools.incognitas.net/toaru/" target="_blank">
                とあるgenerator
              </a>
              , and is inspired by{" "}
              <a
                href="https://cpplover.blogspot.com/2009/12/blog-post_7606.html"
                target="_blank"
              >
                とあるjavascriptの画像生成
              </a>{" "}
              and{" "}
              <a href="http://to-a.ru/" target="_blank">
                とある櫻花の画像生成
              </a>
              .
            </Trans>
          </p>
          <p>
            <Trans t={t} i18nKey="copyrightMessage">
              Created with ♥ by
              <a href="https://kagami.moe" target="_blank">
                かかみ@アトリエにじか
              </a>
              , in celebrating the 20th anniversary of Toaru series.
            </Trans>
          </p>
        </div>
        <div>
          <a href="https://github.com/kagamichan/toaru" target="_blank">
            GitHub
          </a>
        </div>
      </main>
    </I18nProvider>
  );
}
