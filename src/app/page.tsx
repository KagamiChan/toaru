import { Generator } from "./generator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Generator />
      <div className="text-center">
        <p>
          This site is based on{" "}
          <a href="https://tools.incognitas.net/toaru/" target="_blank">とあるgenerator</a>, and
          is inspired by{" "}
          <a href="https://cpplover.blogspot.com/2009/12/blog-post_7606.html" target="_blank">
            本の虫: とあるjavascriptの画像生成
          </a>{" "}
          and <a href="http://to-a.ru/" target="_blank">とある櫻花の画像生成</a>{" "}
        </p>
        <p>Created with ♥ by <a href="https://kagami.moe" target="_blank">かかみ@アトリエにじか</a>, in celebrating the 20th anniversary of Toaru series.</p>
      </div>
      <div>
        <a href="https://github.com/kagamichan/toaru" target="_blank">GitHub</a>
      </div>
    </main>
  );
}
