---
sidebar_position: 9
description: A few helpful tips for using Yazi.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Tips

These tips require prior knowledge of the Yazi configuration file.

If you are using Yazi for the first time, please read our [configuration](/docs/configuration/overview) and [plugins](/docs/plugins/overview) documentation first.

## Full border {#full-border}

<img src={useBaseUrl("/img/full-border.png")} width="600" />

Moved to: https://github.com/yazi-rs/plugins/tree/main/full-border.yazi

## Dropping to the shell {#dropping-to-shell}

Add this keybinding to your `keymap.toml`:

<Tabs>
  <TabItem value="unix" label="Unix" default>

```toml
[[manager.prepend_keymap]]
on   = "!"
run  = 'shell "$SHELL" --block'
desc = "Open shell here"
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```toml
[[manager.prepend_keymap]]
on   = "!"
run  = 'shell "powershell.exe" --block'
desc = "Open PowerShell here"
```

  </TabItem>
</Tabs>

## Close input by once <kbd>Esc</kbd> press {#close-input-by-esc}

You can change the <kbd>Esc</kbd> of input component from the default `escape` to `close` command, in your `keymap.toml`:

```toml
[[input.prepend_keymap]]
on   = "<Esc>"
run  = "close"
desc = "Cancel input"
```

to exiting input directly, without entering Vi mode, making it behave like a regular input box.

## Smart enter: `open` files or `enter` directories all in one key {#smart-enter}

Moved to: https://github.com/yazi-rs/plugins/tree/main/smart-enter.yazi

## Smart paste: `paste` files without entering the directory {#smart-paste}

Save these lines as `~/.config/yazi/plugins/smart-paste.yazi/main.lua`:

```lua
--- @sync entry
return {
	entry = function()
		local h = cx.active.current.hovered
		if h and h.cha.is_dir then
			ya.manager_emit("enter", {})
			ya.manager_emit("paste", {})
			ya.manager_emit("leave", {})
		else
			ya.manager_emit("paste", {})
		end
	end,
}
```

Then bind it for <kbd>p</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = "p"
run  = "plugin smart-paste"
desc = "Paste into the hovered directory or CWD"
```

<details>
  <summary>Demonstrate smart paste</summary>
	<p>Original post: https://github.com/sxyazi/yazi/discussions/957#discussioncomment-9239519</p>
	<video src="https://github.com/sxyazi/yazi/assets/17523360/080212b5-43e7-4c36-83e8-312495d50383" width="100%" controls muted></video>
</details>

## Smart tab: create a tab and enter the hovered directory {#smart-tab}

Save these lines as `~/.config/yazi/plugins/smart-tab.yazi/main.lua`:

```lua
--- @sync entry
return {
	entry = function()
		local h = cx.active.current.hovered
		ya.manager_emit("tab_create", h and h.cha.is_dir and { h.url } or { current = true })
	end,
}
```

Then bind it to the <kbd>t</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = "t"
run  = "plugin smart-tab"
desc = "Create a tab and enter the hovered directory"
```

## Smart switch: create tab if the tab being switched to does not exist {#smart-switch}

Save these lines as `~/.config/yazi/plugins/smart-switch.yazi/main.lua`:

```lua
--- @sync entry
local function entry(_, job)
	local cur = cx.active.current
	for _ = #cx.tabs, job.args[1] do
		ya.manager_emit("tab_create", { cur.cwd })
		if cur.hovered then
			ya.manager_emit("reveal", { cur.hovered.url })
		end
	end
	ya.manager_emit("tab_switch", { job.args[1] })
end

return { entry = entry }
```

Then bind it to the <kbd>2</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on   = "2"
run  = "plugin smart-switch 1"
desc = "Switch or create tab 2"
```

## Folder-specific rules {#folder-rules}

You can subscribe to directory change events through the [`cd` event provided by DDS](/docs/dds#cd), and then do any action you want, such as setting different sorting methods for specific directories.

The following code demonstrates making the `Downloads` directory to sort by modification time, while others are sorted alphabetically. Save these lines as `~/.config/yazi/plugins/folder-rules.yazi/main.lua`:

```lua
local function setup()
	ps.sub("cd", function()
		local cwd = cx.active.current.cwd
		if cwd:ends_with("Downloads") then
			ya.manager_emit("sort", { "mtime", reverse = true, dir_first = false })
		else
			ya.manager_emit("sort", { "alphabetical", reverse = false, dir_first = true })
		end
	end)
end

return { setup = setup }
```

Then enable it in your `~/.config/yazi/init.lua`:

```lua
require("folder-rules"):setup()
```

Credits to [@tianze0926 for sharing it](https://github.com/sxyazi/yazi/issues/623#issuecomment-2096270843).

## Folder-specific previewer and preloader {#folder-previewer}

In addition to the `mime` rules, Yazi also has `name` rules for pre\{viewer,loader}, which accept a glob expression.
This allows for flexible creation of different pre\{viewer,loader} rules for various directories.

For example, you can use the `noop` builtin preloader for a remote mount point like `/remote`, disabling preloads in that directory:

```toml
# yazi.toml
[[plugin.prepend_preloaders]]
name = "/remote/**"
run  = "noop"
```

## Drag and drop via [`dragon`](https://github.com/mwh/dragon) {#drag-and-drop}

Original post: https://github.com/sxyazi/yazi/discussions/327

```toml
[[manager.prepend_keymap]]
on  = "<C-n>"
run = 'shell -- dragon -x -i -T "$1"'
```

## Linux: Copy selected files to the system clipboard while yanking {#selected-files-to-clipboard}

Yazi allows multiple commands to be bound to a single key, so you can set <kbd>y</kbd> to not only do the `yank` but also run a shell script:

```toml
[[manager.prepend_keymap]]
on  = "y"
run = [ 'shell -- echo "$@" | xclip -i -selection clipboard -t text/uri-list', "yank" ]
```

The above is available on X11, there is also a Wayland version (Thanks [@hurutparittya for sharing this](https://discord.com/channels/1136203602898194542/1136203604076802092/1188498323867455619) in Yazi's discord server):

```toml
[[manager.prepend_keymap]]
on  = "y"
run = [ 'shell -- for path in "$@"; do echo "file://$path"; done | wl-copy -t text/uri-list', "yank" ]
```

## `cd` back to the root of the current Git repository {#cd-to-git-root}

```toml
[[manager.prepend_keymap]]
on = [ "g", "r" ]
run = 'shell -- ya emit cd "$(git rev-parse --show-toplevel)"'
```

Credits to [@aidanzhai for sharing it](https://t.me/yazi_rs/3325/15373) in Yazi's telegram group.

## Unix: Add subtitle to the running MPV {#mpv-subtitle}

Add these lines to your `~/.config/yazi/yazi.toml`:

```toml
[[opener.add-sub]]
run  = ''' echo sub-add "'$0'" | socat - /tmp/mpv.sock '''
desc = "Add sub to MPV"

[[open.prepend_rules]]
name = "*.{ass,srt,ssa,sty,sup,vtt}"
use  = [ "add-sub", "edit" ]
```

To make it work, make sure you've:

1. Installed `socat` and can be found in your `$PATH`
2. Enabled and configured the ipc socket to `/tmp/mpv.sock`, that is, include:
   ```
   input-ipc-server=/tmp/mpv.sock
   ```
   in your `~/.config/mpv/mpv.conf`. See [the documentation of `--input-ipc-server`](https://mpv.io/manual/stable/#options-input-ipc-server) for more info.

## Maximize preview pane {#max-preview}

Moved to: https://github.com/yazi-rs/plugins/tree/main/max-preview.yazi

## Hide preview pane {#hide-preview}

Moved to: https://github.com/yazi-rs/plugins/tree/main/hide-preview.yazi

## File navigation wraparound {#navigation-wraparound}

Save these lines as `~/.config/yazi/plugins/arrow.yazi/main.lua`:

```lua
--- @sync entry
return {
	entry = function(_, job)
		local current = cx.active.current
		local new = (current.cursor + job.args[1]) % #current.files
		ya.manager_emit("arrow", { new - current.cursor })
	end,
}
```

Then bind it for <kbd>k</kbd> and <kbd>j</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = "k"
run = "plugin arrow -1"

[[manager.prepend_keymap]]
on  = "j"
run = "plugin arrow 1"
```

## Navigation in the parent directory without leaving the CWD {#parent-arrow}

Save these lines as `~/.config/yazi/plugins/parent-arrow.yazi/main.lua`:

<Tabs>
  <TabItem value="classic" label="Classic" default>

```lua
--- @sync entry
local function entry(_, job)
	local parent = cx.active.parent
	if not parent then return end

	local target = parent.files[parent.cursor + 1 + job.args[1]]
	if target and target.cha.is_dir then
		ya.manager_emit("cd", { target.url })
	end
end

return { entry = entry }
```

  </TabItem>
  <TabItem value="skip-files" label="Skip files">

```lua
--- @sync entry
local function entry(_, job)
	local parent = cx.active.parent
	if not parent then return end

	local offset = tonumber(job.args[1])
	if not offset then return ya.err(job.args[1], 'is not a number') end

	local start = parent.cursor + 1 + offset
	local end_ = offset < 0 and 1 or #parent.files
	local step = offset < 0 and -1 or 1
	for i = start, end_, step do
		local target = parent.files[i]
		if target and target.cha.is_dir then
			return ya.manager_emit("cd", { target.url })
		end
	end
end

return { entry = entry }
```

  </TabItem>
</Tabs>

Then bind it for <kbd>K</kbd> and <kbd>J</kbd> key, in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = "K"
run = "plugin parent-arrow -1"

[[manager.prepend_keymap]]
on  = "J"
run = "plugin parent-arrow 1"
```

## Confirm before quitting if multiple tabs are open {#confirm-quit}

Save these lines as `~/.config/yazi/plugins/confirm-quit.yazi/main.lua`:

```lua
local count = ya.sync(function() return #cx.tabs end)

local function entry()
	if count() < 2 then
		return ya.manager_emit("quit", {})
	end

	local yes = ya.confirm {
		pos = { "center", w = 60, h = 10 },
		title = "Quit?",
		content = "There are multiple tabs open. Are you sure you want to quit?",
	}
	if yes then
		ya.manager_emit("quit", {})
	end
end

return { entry = entry }
```

Next, bind it to the <kbd>q</kbd> key in your `keymap.toml`:

```toml
[[manager.prepend_keymap]]
on  = "q"
run = "plugin confirm-quit"
```

Credits to [@lpnh for sharing it](https://github.com/sxyazi/yazi/issues/2267#issuecomment-2624805134).

## No status bar {#no-status-bar}

<img src={useBaseUrl("/img/no-status-bar.jpg")} width="600" />

Moved to: https://github.com/yazi-rs/plugins/tree/main/no-status.yazi

## Show symlink in status bar {#symlink-in-status}

<img src={useBaseUrl("/img/symlink-in-status.png")} width="600" />

Add the following code to your `~/.config/yazi/init.lua`:

```lua
Status:children_add(function(self)
	local h = self._current.hovered
	if h and h.link_to then
		return " -> " .. tostring(h.link_to)
	else
		return ""
	end
end, 3300, Status.LEFT)
```

## Show user/group of files in status bar {#user-group-in-status}

<img src={useBaseUrl("/img/owner.png")} width="600" />

Add the following code to your `~/.config/yazi/init.lua`:

```lua
Status:children_add(function()
	local h = cx.active.current.hovered
	if h == nil or ya.target_family() ~= "unix" then
		return ""
	end

	return ui.Line {
		ui.Span(ya.user_name(h.cha.uid) or tostring(h.cha.uid)):fg("magenta"),
		":",
		ui.Span(ya.group_name(h.cha.gid) or tostring(h.cha.gid)):fg("magenta"),
		" ",
	}
end, 500, Status.RIGHT)
```

## Show username and hostname in header {#username-hostname-in-header}

<img src={useBaseUrl("/img/hostname-in-header.png")} width="600" />

Add the following code to your `~/.config/yazi/init.lua`:

```lua
Header:children_add(function()
	if ya.target_family() ~= "unix" then
		return ""
	end
	return ui.Span(ya.user_name() .. "@" .. ya.host_name() .. ":"):fg("blue")
end, 500, Header.LEFT)
```

## macOS: Preview files with the system Quick Look {#macos-quick-look}

```toml
[[manager.prepend_keymap]]
on = "<C-p>"
run = 'shell -- qlmanage -p "$@"'
```

Credits to [@UncleGravity for sharing it](https://discord.com/channels/1136203602898194542/1146658361740369960/1293471643959558156) in Yazi's discord server.

## Specify a different editor for bulk renaming {#bulk-editor}

For bulk renaming, Yazi finds the first matching opener in your [`[open]`](/docs/configuration/yazi#open) rules with:

|         | Value               |
| ------- | ------------------- |
| `block` | `true`              |
| `name`  | `"bulk-rename.txt"` |
| `mime`  | `"text/plain"`      |

to use as the editor for editing the file list.

By default, this matches your editor used for opening normal text files, if you want to use an editor different from that:

```toml
# ~/.config/yazi/yazi.toml
[[opener.bulk-rename]]
run   = 'hx "$@"'
block = true

[[open.prepend_rules]]
name = "bulk-rename.txt"
use  = "bulk-rename"
```

## Linux: Yazi as your system file chooser {#system-chooser}

The `xdg-desktop-portal-termfilechooser` backend lets you replace the default file picker with Yazi, providing seamless integration with applications, such as Firefox.

For installation steps, refer to the [installation guide](https://github.com/hunkyburrito/xdg-desktop-portal-termfilechooser?tab=readme-ov-file#installation) and additional instructions available there.

## File tree picker in Helix with Zellij {#helix-with-zellij}

Yazi can be used as a file picker to browse and open file(s) in your current Helix instance (running in a Zellij session).

Add a keymap to your Helix config, for example <kbd>Ctrl</kbd> + <kbd>y</kbd>:

```toml
# ~/.config/helix/config.toml
[keys.normal]
C-y = ":sh zellij run -c -f -x 10% -y 10% --width 80% --height 80% -- bash ~/.config/helix/yazi-picker.sh open"
```

Or if you also want to support splitting the pane, you can add more keymaps:

```toml
# ~/.config/helix/config.toml
[keys.normal.C-y]
# Open the file(s) in the current window
y = ":sh zellij run -c -f -x 10% -y 10% --width 80% --height 80% -- bash ~/.config/helix/yazi-picker.sh open"
# Open the file(s) in a vertical pane
v = ":sh zellij run -c -f -x 10% -y 10% --width 80% --height 80% -- bash ~/.config/helix/yazi-picker.sh vsplit"
# Open the file(s) in a horizontal pane
h = ":sh zellij run -c -f -x 10% -y 10% --width 80% --height 80% -- bash ~/.config/helix/yazi-picker.sh hsplit"
```

Then save the following script as `~/.config/helix/yazi-picker.sh`:

```sh
#!/usr/bin/env bash

paths=$(yazi --chooser-file=/dev/stdout | while read -r; do printf "%q " "$REPLY"; done)

if [[ -n "$paths" ]]; then
	zellij action toggle-floating-panes
	zellij action write 27 # send <Escape> key
	zellij action write-chars ":$1 $paths"
	zellij action write 13 # send <Enter> key
else
	zellij action toggle-floating-panes
fi
```

Note: this uses a floating window, but you should also be able to open a new pane to the side, or in place. Review the Zellij documentation for more info.

Original post: https://github.com/zellij-org/zellij/issues/3018#issuecomment-2086166900, credits to [@rockboynton](https://github.com/rockboynton), [@postsolar](https://github.com/postsolar) and [@TheAwiteb](https://github.com/TheAwiteb) for sharing and polishing it!

<details>
  <summary>Demonstrate Helix+Zellij+Yazi workflow</summary>
	<video src="https://github.com/helix-editor/helix/assets/17523360/a4dde9e0-96bf-42a4-b946-40cbee984e69" width="100%" controls muted></video>
</details>

## Email selected files using Thunderbird

To send selected files using Thunderbird, with a keybinding <kbd>Ctrl</kbd> + <kbd>e</kbd>:

```toml
# ~/.config/yazi/keymap.toml
[[manager.prepend_keymap]]
on  = "<C-e>"
run = '''shell --
	paths=$(for p in "$@"; do echo "$p"; done | paste -s -d,)
	thunderbird -compose "attachment='$paths'"
'''
```

## Preview directory with Rofi

**This tip currently requires Yazi nightly version.**

This script lets you preview the current directory's thumbnails using Rofi. Selecting an item reveals it in Yazi.

Save the script in your preferred location, for example, ~/.config/rofi/rofi-gridview.sh.

```bash
#!/bin/bash

rofi \
	-theme fullscreen-preview \
	-show filebrowser \
	-filebrowser-command "ya emit reveal" \
	-filebrowser-directory "$(pwd)"
```

Make it executable:

```
chmod +x ~/.config/rofi/rofi-gridview.sh
```

Then add the script as a keybinding.

```toml
# ~/.config/yazi/keymap.toml
[[manager.prepend_keymap]]
on  = "<C-s>"
run = '''
  shell --confirm '~/.config/rofi/rofi-gridview.sh'
'''
'''
```

Rofi themes: https://davatorium.github.io/rofi/themes/themes

## Make Yazi even faster than fast {#make-yazi-even-faster}

While Yazi is already fast, there is still plenty of room for optimization for specific users or under certain conditions:

- For users who don't need image previews at all, disabling the default `image` previewer and preloader will make Yazi faster by reducing the I/O read file and CPU decode image consumption.
- For users managing network files, it's recommended to [disable all previewers and preloaders](/docs/tips#folder-previewer) since previewing and preloading these files means they need to be downloaded locally.
- For low-spec devices like Raspberry Pi, [reducing the concurrency](/docs/configuration/yazi#tasks) will make Yazi faster since the default configuration is optimized for PCs, and high concurrency on these low-spec devices may have the opposite effect.
- For users who don't need accurate mime-type, [`mime-ext.yazi`](https://github.com/yazi-rs/plugins/tree/main/mime-ext.yazi) may be useful, as it simply returns mime-type based on file extensions, while Yazi defaults to obtaining mime-type based on file content for accuracy. Mime-type is used for matching opening, previewing, rendering rules. Encourage users to choose an appropriate `mime` plugin based on their needs, which is why we decided to open it up to plugin developers.
- For high-performance terminal emulators, lowering the [`image_delay` option](/docs/configuration/yazi/#preview.image_delay) or setting it to 0 can reduce image preview latency.
