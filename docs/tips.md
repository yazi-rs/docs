---
sidebar_position: 5
description: A few helpful tips for using Yazi.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

## Full border

You can implement a full border for Yazi via the UI plugin.

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Copy the preset [`manager` component](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/manager.lua) to any place, for example `~/.config/yazi/ui.lua`, then apply the following patch:

```diff
@@ -10,16 +10,26 @@ function Manager:render(area)
 		})
 		:split(area)

+	local bar = function(c, x, y)
+		return ui.Bar(ui.Rect { x = math.max(0, x), y = math.max(0, y), w = 1, h = 1 }, ui.Position.TOP):symbol(c)
+	end
+
 	return utils.flat {
-		-- Borders
-		ui.Bar(chunks[1], ui.Position.RIGHT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
-		ui.Bar(chunks[3], ui.Position.LEFT):symbol(THEME.manager.border_symbol):style(THEME.manager.border_style),
+		ui.Border(area, ui.Position.ALL),
+		ui.Bar(chunks[1], ui.Position.RIGHT),
+		ui.Bar(chunks[3], ui.Position.LEFT),
+
+		bar("┬", chunks[1].right - 1, chunks[1].y),
+		bar("┴", chunks[1].right - 1, chunks[1].bottom - 1),
+		bar("┬", chunks[2].right, chunks[2].y),
+		bar("┴", chunks[2].right, chunks[1].bottom - 1),

 		-- Parent
-		Folder:render(chunks[1]:padding(ui.Padding.x(1)), { kind = Folder.PARENT }),
+		Folder:render(chunks[1]:padding(ui.Padding.xy(1)), { kind = Folder.PARENT }),
 		-- Current
-		Folder:render(chunks[2], { kind = Folder.CURRENT }),
+		Folder:render(chunks[2]:padding(ui.Padding.y(1)), { kind = Folder.CURRENT }),
 		-- Preview
-		ui.Base(chunks[3]:padding(ui.Padding.x(1)), ui.Base.PREVIEW),
+		ui.Base(chunks[3]:padding(ui.Padding.xy(1)), ui.Base.PREVIEW),
 	}
 end
```

Finally include it and adjust the manager layout offset:

```toml
# yazi.toml
[plugins]
preload = [
	"~/.config/yazi/ui.lua"
]

# theme.toml
[manager]
folder_offset  = [ 2, 0, 2, 0 ]
preview_offset = [ 2, 1, 2, 1 ]
```

## Show symlink in status bar

<img src={useBaseUrl("/img/symlink-in-status.png")} width="600" />

You only need to rewrite the [`Status:name()` method](https://github.com/sxyazi/yazi/blob/main/yazi-plugin/preset/components/status.lua#L39-L46) to achieve this feature, save this function as a file, and apply the following patch to it:

```diff
@@ -42,7 +42,11 @@ function Status:name()
 		return ui.Span("")
 	end

-	return ui.Span(" " .. h.name)
+	local linked = ""
+	if h.link_to ~= nil then
+		linked = " -> " .. tostring(h.link_to)
+	end
+	return ui.Span(" " .. h.name .. linked)
 end
```

Finally just include it:

```toml
# yazi.toml
[plugins]
preload = [
	"/path/to/your/status-name-function.lua"
]
```
