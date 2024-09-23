// 引入 xml 库（如有需要，可通过 npm 安装 xml 库）
import { writeFileSync } from 'fs';
import { UserFeed } from "../types/view"
// OPML 生成函数
export function generateOpml(data: UserFeed[]): string {
  const now = new Date().toISOString();

  // 开始构建 OPML 字符串
  let opml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  opml += `<opml version="2.0">\n`;
  opml += `  <head>\n`;
  opml += `    <dateCreated>${now}</dateCreated>\n`;
  opml += `    <title>Follow</title>\n`;
  opml += `  </head>\n`;
  opml += `  <body>\n`;
  
  // 遍历数据并生成 outline
  data.forEach((item) => {
    const feed = item.feeds;
    const category = item.category || "Uncategorized";
    const title = feed.title || "Untitled";
    const xmlUrl = feed.url || "";
    const htmlUrl = feed.siteUrl || "";

    opml += `    <outline text="${category}">\n`;
    opml += `      <outline text="${title}" title="${title}" xmlUrl="${xmlUrl}" htmlUrl="${htmlUrl}" type="rss"></outline>\n`;
    opml += `    </outline>\n`;
  });

  opml += `  </body>\n`;
  opml += `</opml>\n`;

  return opml;
}