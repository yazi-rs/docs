---
sidebar_position: 1
description: Learn how to configure Yazi's basic functionality.
---

# yazi.toml

:::note
If you want to fine-tune the default settings, the first step is to [create your own configuration file](/docs/configuration/overview).
:::

## [manager] {#manager}

### `ratio` {#manager.ratio}

Manager layout by ratio, 3-element array. For example:

- `[1, 4, 3]`: 1/8 width for parent, 4/8 width for current, 3/8 width for preview

Set the value to `0` to hide the corresponding panel, but at least one panel must be visible (non-zero).

### `sort_by` {#manager.sort_by}

File sorting method.

- `"none"`: Don't sort.
- `"mtime"`: Sort by last modified time.
- `"btime"`: Sort by birth time.
- `"extension"`: Sort by file extension.
- `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
- `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
- `"size"`: Sort by file size.
- `"random"`: Sort randomly.

### `sort_sensitive` {#manager.sort_sensitive}

Sort case-sensitively.

- `true`: Case-sensitive
- `false`: Case-insensitive

### `sort_reverse` {#manager.sort_reverse}

Display files in reverse order.

- `true`: Reverse order
- `false`: Normal order

### `sort_dir_first` {#manager.sort_dir_first}

Display directories first.

- `true`: Directories first
- `false`: Respects `sort_by` and `sort_reverse` only

### `sort_translit` {#manager.sort_translit}

Transliterate filenames for sorting (i.e. replaces `Â` as `A`, `Æ` as `AE`, etc.), only available if `sort_by = "natural"`.

This is useful for files that contain Hungarian characters.

- `true`: Enabled
- `false`: Disabled

### `linemode` {#manager.linemode}

Line mode: display information associated with the file on the right side of the file list row.

- `"none"`: No line mode.
- `"size"`: Display the size in bytes of the file. Note that currently directory sizes are only evaluated when [`sort_by = "size"`](/docs/configuration/yazi#manager.sort_by), and this might change in the future.
- `"btime"`: Display the birth time of the file.
- `"mtime"`: Display the last modified time of the file.
- `"permissions"`: Display the permissions of the file, only available on Unix-like systems.
- `"owner"`: Display the owner of the file, only available on Unix-like systems.

You can also specify any 1 to 20 characters, and extend it within a UI plugin, which means you can implement your own linemode through the plugin system like this:

```toml
# ~/.config/yazi/yazi.toml
[manager]
linemode = "size_and_mtime"
```

```lua
-- ~/.config/yazi/init.lua
function Linemode:size_and_mtime()
	local time = math.floor(self._file.cha.mtime or 0)
	if time == 0 then
		time = ""
	elseif os.date("%Y", time) == os.date("%Y") then
		time = os.date("%b %d %H:%M", time)
	else
		time = os.date("%b %d  %Y", time)
	end

	local size = self._file:size()
	return string.format("%s %s", size and ya.readable_size(size) or "-", time)
end
```

### `show_hidden` {#manager.show_hidden}

Show hidden files.

- `true`: Show
- `false`: Do not show

### `show_symlink` {#manager.show_symlink}

Show the path of the symlink file point to, after the filename.

- `true`: Show
- `false`: Do not show

### `scrolloff` {#manager.scrolloff}

The number of files to keep above and below the cursor when moving through the file list.

If the value is larger than half the screen height (e.g. `200`), the cursor will be centered.

### `mouse_events` {#manager.mouse_events}

Array of strings, the types of mouse events can be received by the plugin system, available values:

- `"click"`: Mouse click
- `"scroll"`: Mouse vertical scroll
- `"touch"`: Mouse horizontal scroll
- `"move"`: Mouse move
- `"drag"`: Mouse drag (Some terminals do not support this)

Usually, you don't need to change it, unless the plugin you're using requires enabling a certain event.

### `title_format` {#manager.title_format}

The terminal title format, which is a string with the following placeholders available:

- `{cwd}` - current working directory

If you don't want Yazi to automatically update the title, set it to an empty string (`""`).

## [preview] {#preview}

### `wrap` {#preview.wrap}

Wrap long lines in the code preview.

- `"yes"`: Enable word wrap
- `"no"`: Disable word wrap

### `tab_size` {#preview.tab_size}

The width of a tab character (`\t`) in spaces.

### `max_width` {#preview.max_width}

Maximum preview width for images. Do a `yazi --clear-cache` to take effect after changing this.

This value is also used for preloading images; the larger it is, the larger the image cache generated, which consumes more CPU.

### `max_height` {#preview.max_height}

Maximum preview height for images. Do a `yazi --clear-cache` to take effect after changing this.

This value is also used for preloading images; the larger it is, the larger the image cache generated, which consumes more CPU.

### `cache_dir` {#preview.cache_dir}

The system cache directory is used by default, and the cached files will go away on a reboot automatically.

If you want to make it more persistent, you can specify the cache directory manually as an absolute path.

### `image_delay` {#preview.image_delay}

Wait for at least the specified milliseconds before starting to send image preview data to the terminal.

This is to alleviate lag caused by some terminal emulators struggling to render images Yazi sent in time, when users scroll through the file list quickly.

See https://github.com/sxyazi/yazi/pull/1512 for more information.

### `image_filter` {#preview.image_filter}

The filter used on image downscaling, available values:

- `"nearest"` - Nearest Neighbor
- `"triangle"` - Linear Triangle
- `"catmull-rom"` - Catmull-Rom
- `"lanczos3"` - Lanczos with window 3

They are arranged in order from fast to slow, and from poor to good quality - Lanczos3 provides the highest quality but is also the slowest.

See the example and benchmark here: https://docs.rs/image/0.24.8/image/imageops/enum.FilterType.html#examples

### `image_quality` {#preview.image_quality}

Quality on pre-caching images, range 50-90.

The larger value, the better image quality, but slower with more CPU consumption, and generates larger cache files that occupy more storage space.

### `sixel_fraction` {#preview.sixel_fraction}

Sixel is a very old image format that only supports 256 colors. For better image preview, Yazi trains a neural network for each image to find the most representative colors.

This value determines the number of samples used during the training, range 10-20. A smaller value produces better results but is also slower.

### `ueberzug_scale` / `ueberzug_offset` {#preview.ueberzug_scale}

- ueberzug_scale (Float): Ueberzug image scaling ratio, `scale>1` for enlargement, `scale<1` for reduction. For example, `0.5` indicates a reduction to half.
- ueberzug_offset (`[x, y, width, height]`): Ueberzug image offset, in cell units. For example, `[0.5, 0.5, -0.5, -0.5]` indicates that the image is offset by half a cell in both directions, and the width and height are reduced by half a cell.

This is useful for solving [a bug of Überzug++ image size calculation](https://github.com/jstkdng/ueberzugpp/issues/122).

If your monitor has a `2.0` scale factor, and is running on Wayland under Hyprland, you may need to set `ueberzug_scale: 0.5`, and adjust the value of `ueberzug_offset` according to your case, to offset this issue.

## [opener] {#opener}

Configure available openers that can be used in [`[open]`](#open), for example:

```toml
[opener]
play = [
	{ run = 'mpv "$@"', orphan = true, for = "unix" },
	{ run = '"C:\Program Files\mpv.exe" %*', orphan = true, for = "windows" }
]
edit = [
	{ run = '$EDITOR "$@"', block = true, for = "unix" },
	{ run = "%EDITOR% %*",  block = true, for = "windows" },
]
open = [
	{ run = 'xdg-open "$@"', desc = "Open" },
]
open_directory = [
	{ run = 'code "$@"', desc = "Open Directory in VSCode" },
]
# ...
```

Available options are as follows:

- `run`: The command to open the selected files, with the following variables available:
  - `$n` (Unix) / `%n` (Windows): The N-th selected file, starting from `1`. e.g. `$2` represents the second selected file.
  - `$@` (Unix) / `%*` (Windows): All selected files, i.e. `$1`, `$2`, ..., `$n`.
  - `$0` (Unix) / `%0` (Windows): The hovered file.
- `block`: Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs.
- `orphan`: Keep the process running even if Yazi has exited, once specified, the process will be detached from the task scheduling system.
- `desc`: Description of the opener, display in interactive components, such as "Open with" and help menu.
- `for`: The opener is only available on this system; if not specified, it's available on all systems. Available values:
  - `unix`: Linux and macOS
  - `windows`: Windows
  - `linux`: Linux
  - `macos`: macOS
  - `android`: Android (Termux)

The commands specified by `run` follow platform-specific differences. For example, Unix shell requires wrapping `$` with quotes, while `%` in Windows batch scripts doesn't.

Refer to the documentation of `sh` and `cmd.exe` for details.

## [open] {#open}

Set rules for opening specific files. You can prepend or append rules to the default through `prepend_rules` and `append_rules` (See [Configuration mixing](/docs/configuration/overview#mixing) for details):

```toml
[open]
prepend_rules = [
	{ name = "*.json", use = "edit" },

	# Multiple openers for a single rule
	{ name = "*.html", use = [ "open", "edit" ] },
]
append_rules = [
	{ name = "*", use = "my-fallback" },
]
```

If your `append_rules` contains wildcard rules, they will always take precedence over the default wildcard rules as the fallback.

Or, use `rules` to rewrite the entire default rules:

```toml
[open]
rules = [
	{ mime = "text/*", use = "edit" },
	{ mime = "video/*", use = "play" },

	# { mime = "application/json", use = "edit" },
	{ name = "*.json", use = "edit" },

	# Multiple openers for a single rule
	{ name = "*.html", use = [ "open", "edit" ] },

	# Rule for opening a directory
	{ mime = "inode/directory", use = "open_directory" },
]
```

Available rule options are as follows:

- `name`: Glob expression for matching the file name. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `mime`: Glob expression for matching the mime-type. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `use`: Opener name corresponding to the names in the [`[opener]` section](#opener).

With that:

- You can [`spot`](/docs/configuration/keymap#manager.spot) on a file to check it's mime-type with the default <kbd>Tab</kbd> key.
- If `use` is an array containing multiple openers, all commands in these openers will be merged. [`open`](/docs/configuration/keymap#manager.open) will run the first of these commands; [`open --interactive`](/docs/configuration/keymap#manager.open) will list all of these commands in the "open with" menu.

## [tasks] {#tasks}

### `micro_workers` {#tasks.micro_workers}

Maximum number of concurrent micro-tasks.

### `macro_workers` {#tasks.macro_workers}

Maximum number of concurrent macro-tasks.

### `bizarre_retry` {#tasks.bizarre_retry}

Maximum number of retries when a bizarre failure occurs.

### `suppress_preload` {#tasks.suppress_preload}

Exclude the preload tasks created by the system from the task list, do not report their progress, and do not consider them on app exit confirming.

### `image_alloc` {#tasks.image_alloc}

Maximum memory allocation limit in bytes for decoding a single image, `0` for unlimited.

### `image_bound` {#tasks.image_bound}

An array of `[width, height]`, maximum image size (in pixels) for decoding a single image, and `0` for unlimited.

## [plugin] {#plugin}

### fetchers {#plugin.fetchers}

:::warning
Fetchers are not complete yet, and the API is subject to change without prior notice!
:::

TODO

You can prepend or append new fetchers to the default `fetchers` under `[plugin]` by `prepend_fetchers` and `append_fetchers`, see [Configuration mixing](/docs/configuration/overview#mixing) for details.
Here are the available options for a single rule:

- `id` (String): Fetcher's ID.
- `name` (String): Glob expression for matching the file name. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `run` (String): The name of the Lua plugin to be run.
- `if` (String): Execute the fetcher based on this condition.
- `prio` (String): The priority of the task. One of `high`, `normal` or `low`.

### previewers {#plugin.previewers}

You can prepend or append new preview rules to the default `previewers` under `[plugin]` by `prepend_previewers` and `append_previewers`, see [Configuration mixing](/docs/configuration/overview#mixing) for details.
Here are the available options for a single rule:

- `name` (String): Glob expression for matching the file name. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `mime` (String): Glob expression for matching the mime-type. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `run` (String): The name of the Lua plugin to be run.
- `sync` (Boolean): Whether to run in the sync context, default is `false`.

```toml
[plugin]
prepend_previewers = [
	# HEIC previewer
	{ mime = "image/heic", run = "heic" },
]

append_previewers = [
	# My fallback previewer
	{ name = "*" , run = "binary" },
]
```

If your `append_previewers` contains wildcard `name` rules (`"*"` or `"*/"`), they will always take precedence over the default wildcard rules as the fallback.

Yazi comes with the these previewer plugins:

- folder: bridge between the Yazi filesystem and the preview
- code: bridge between built-in code highlighting and the preview, providing async concurrent rendering
- json: bridge between `jq` and the preview, providing async concurrent rendering
- noop: no operation
- image: presentation layer of built-in image preview, offering mixed preview capabilities
- video: bridge between `ffmpeg` and the preview, offering mixed preview capabilities
- pdf: bridge between `pdftoppm` and the preview, offering mixed preview capabilities
- archive: bridge between 7-Zip and the preview, offering mixed preview and concurrent rendering capabilities

If you want to create your own previewer, see [Previewer API](/docs/plugins/overview#previewer).

### preloaders {#plugin.preloaders}

You can prepend or append new preview rules to the default `preloaders` under `[plugin]` by `prepend_preloaders` and `append_preloaders`, see [Configuration mixing](/docs/configuration/overview#mixing) for details.
Here are the available options for a single rule:

- `name` (String): Glob expression for matching the file name. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `mime` (String): Glob expression for matching the mime-type. Case-insensitive by default, add `\s` to the beginning to make it sensitive.
- `cond` (String): Conditional expression – Only rules that meet this condition and satisfy either the `name` or `mime` will be applied. For example, `A & B` means A and B, and `A | !B` means A or not B. Here are the available factors:
  - `mime`: This file has a mime-type.
- `run` (String): The name of the Lua plugin to be run.
- `multi` (Boolean): Whether to preload multiple files at once.
- `prio` (String): Preload priority, `low`, `normal` or `high`. The default is `normal` if not specified.

```toml
[plugin]
prepend_preloaders = [
	# HEIC preloader
	{ mime = "image/heic", run = "heic" },
]
```

Yazi comes with the these preloader plugins:

- mime: preloads mime-type of files in chunks
- noop: no operation
- image: preloads and caches images
- video: preloads and caches videos
- pdf: preloads and caches PDFs.

If you want to create your own preloader, see [Preloader API](/docs/plugins/overview#preloader).

## [input] {#input}

### `cursor_blink` {#input.cursor_blink}

Control the cursor blinking.

- `true`: Blink.
- `false`: Do not blink.

You can customize the title and position of each input. There are following inputs: `cd`, `create`, `rename`, `filter`, `find`, `search` and `shell`. To change their configuration use the underscore between the name and the option, like `cd_origin`.

As for position, it consists of two parts: [Origin](#input.origin) and [Offset](#input.offset).
The origin is the top-left corner of the input, and the offset is the increment from this origin. Together, they determine the area of the input on the screen.

### Origin {#input.origin}

For the origin, the following values are available:

- top-left
- top-center
- top-right
- bottom-left
- bottom-center
- bottom-right
- center
- hovered (the cursor position of hovered file)

### Offset {#input.offset}

As for the offset, it's a 4-element tuple: `(x, y, width, height)`.

### Placeholder {#input.placeholder}

Some inputs have special placeholders that will be replaced with actual content on display:

- cd_title: String

  Title of the [`cd --interactive`](/docs/configuration/keymap/#manager.cd) input used to enter the target path.

- create_title: [String, String]

  It's a tuple of 2-element: first for [`create`](/docs/configuration/keymap/#manager.create) input title, second for `create --dir` command.

- rename_title: String

  Title of the [`rename`](/docs/configuration/keymap/#manager.rename) input used to enter the new name.

- filter_title: String

  Title of the [`filter`](/docs/configuration/keymap/#manager.filter) input used to enter the keyword.

- find_title: [String, String]

  It's a tuple of 2-element: first for [`find`](/docs/configuration/keymap/#manager.find), second for `find --previous`.

- search_title: String

  - `{n}`: Name of the current [`search`](/docs/configuration/keymap/#manager.search) engine.

- shell_title: [String, String]

  It's a tuple of 2-element: first for [`shell --interactive`](/docs/configuration/keymap/#manager.shell), second for `shell --interactive --block`.

## [confirm] {#confirm}

Same as the [`[input]`](#input) section. There are a few available: `trash`, `delete`, `overwrite` and `quit`.

## [pick] {#pick}

Same as the [`[input]`](#input) section. Available selectors: `open`.

## [which] {#which}

### `sort_by` {#which.sort_by}

Candidate sorting method.

- `"none"`: Don't sort.
- `"key"`: Sort by key.
- `"desc`: Sort by description.

### `sort_sensitive` {#which.sort_sensitive}

Sort case-sensitively.

- `true`: Case-sensitive
- `false`: Case-insensitive

### `sort_reverse` {#which.sort_reverse}

Display candidates in reverse order.

- `true`: Reverse order
- `false`: Normal order

### `sort_translit` {#which.sort_translit}

Transliterate filenames for sorting, i.e. replaces `Â` as `A`, `Æ` as `AE`, etc.

This is useful for files that contain Hungarian characters.

- `true`: Enabled
- `false`: Disabled
