function RssNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = "M60,60 L60,60 L150,120 L240,120 M60,150 L60,150 L240,150 M60,240 L60,240 L150,180 L240,180"

  this.receive = function(q)
  {
    let logs = Ø('router').cache.tables.horaire;

    let selection = []
    for(let id in logs){
      let log = logs[id];
      if(selection.length >= 60){ break; }
      if(log.time.offset > 0){ continue; }
      if(!log.photo){ continue; }
      selection.push(log);
    }

    let html = this.render(selection);
    this.show(html)
  }

  this.show = function(html)
  {
    let win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=480,top="+(screen.height-200)+",left="+(screen.width-640));
    win.document.body.innerHTML = `<pre>${html.to_entities()}</pre>`;
  }

  this.items = function(logs)
  {
    let html = ""
    for(let id in logs){
      let log = logs[id];
      html += `
  <item>
    <title>${log.term} — ${log.name}</title>
    <link>https://wiki.xxiivv.com/${log.term.to_url()}</link>
    <guid isPermaLink='false'>IV${log.photo}</guid>
    <pubDate>${log.time.to_date().toUTCString()}</pubDate>
    <dc:creator><![CDATA[Devine Lu Linvega]]></dc:creator>
    <description>
      &lt;img src="https://wiki.xxiivv.com/media/diary/${log.photo}.jpg"/&gt;
      &lt;br/&gt;
      ${log.host.data.BREF ? log.host.data.BREF.to_curlic('https://wiki.xxiivv.com/').to_rss() : ''}
    </description>
  </item>
`
    }
    return html;
  }

  this.render = function(logs)
  {
    return `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">

<channel>
  <title>XXIIVV — Journal</title>
  <link>https://wiki.xxiivv.com/</link>
  <description>Devine Lu Linvega's Journal</description>
  <pubDate>${logs[0].time.to_date().toUTCString()}</pubDate>
  <generator>Oscean - Riven</generator>
  ${this.items(logs)}
</channel>

</rss>`
  }
}