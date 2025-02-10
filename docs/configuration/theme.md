---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# theme.toml

:::tip
If you're looking for ready-made themes and don't want to create one yourself, check out the [yazi-rs/flavors](https://github.com/yazi-rs/flavors) repository.
:::

## Types {#types}

### Color {#types.color}

A color. It can be in Hex format with RGB values, such as `"#484D66"`. Or can be one of the following 17 values:

- `"reset"`
- `"black"`
- `"white"`
- `"red"`
- `"lightred"`
- `"green"`
- `"lightgreen"`
- `"yellow"`
- `"lightyellow"`
- `"blue"`
- `"lightblue"`
- `"magenta"`
- `"lightmagenta"`
- `"cyan"`
- `"lightcyan"`
- `"gray"`
- `"darkgray"`

### Style {#types.style}

Appears in a format similar to `{ fg = "#e4e4e4", bg = "black", ... }`, and supports the following properties:

- fg (Color): Foreground color
- bg (Color): Background color
- bold (Boolean): Bold
- dim (Boolean): Dim (not supported by all terminals)
- italic (Boolean): Italic
- underline (Boolean): Underline
- blink (Boolean): Blink
- blink_rapid (Boolean): Rapid blink
- reversed (Boolean): Reversed foreground and background colors
- hidden (Boolean): Hidden
- crossed (Boolean): Crossed out

## [flavor] {#flavor}

- dark (String): Flavor name used in dark mode, e.g. `"dracula"`.
- light (String): Flavor name used in light mode, e.g. `"gruvbox"`.

See [flavor documentation](/docs/flavors/overview) for more details.

## [manager] {#manager}

- cwd (Style): CWD text style.

Hovered:

- hovered (Style): Hovered file style.
- preview_hovered (Style): Hovered file style, in the preview pane.

Find: The `find` feature

- find_keyword (Style): Style of the highlighted portion in the filename.
- find_position (Style): Style of current file location in all found files to the right of the filename.

Marker: Color block on the left side separator line in the filename.

- marker_copied (Style): Copied file marker style.
- marker_cut (Style): Cut file marker style.
- marker_marked (Style): Marker style of pre-selected file in visual mode.
- marker_selected (Style): Selected file marker style.

Tab: Tab bar.

- tab_active (Style): Active tab style.
- tab_inactive (Style): Inactive tab style.
- tab_width (Number): Tab maximum width. When set to a value greater than 2, the remaining space will be filled with the tab name, which is current directory name.

Count: Counters.

- count_copied (Style): Style of copied file number.
- count_cut (Style): Style of cut file number.
- count_selected (Style): Style of selected file number.

Border:

- border_symbol (String): Border symbol. e.g. `"│"`.
- border_style (Style): Border style.

Highlighting: The built-in syntax highlighting feature

- syntect_theme (String): For example, `"~/Downloads/Dracula.tmTheme"`, not available after using a flavor, as flavors always use their own tmTheme files `tmtheme.xml`.

  Code preview highlighting themes, which are paths to `.tmTheme` files. You can find them on GitHub [using "tmTheme" as a keyword](https://github.com/search?q=tmTheme&type=repositories)

## [mode] {#mode}

Normal mode

- normal_main (Style): Normal mode main style.
- normal_alt (Style): Normal mode alternative style.

Select mode

- select_main (Style): Select mode main style.
- select_alt (Style): Select mode alternative style.

Unset mode

- unset_main (Style): Unset mode main style.
- unset_alt (Style): Unset mode alternative style.

## [status] {#status}

- sep_left (\{ open: String, close: String }): Left separator symbol. e.g. `{ open = "", close = "]" }`.
- sep_right (\{ open: String, close: String }): Right separator symbol. e.g. `{ open = "[", close = "" }`.

<img src={useBaseUrl("/img/status-sep-explain.png")} />

Progress

- progress_label (Style): Progress label style.
- progress_normal (Style): Style of the progress bar when it is not in an error state.
- progress_error (Style): Style of the progress bar when an error occurs.

Permissions

- perm_type (Style): File type.
- perm_read (Style): Read permission.
- perm_write (Style): Write permission.
- perm_exec (Style): Execute permission.
- perm_sep (Style): `-` separator.

## [pick] {#pick}

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

## [input] {#input}

- border (Style): Border style.
- title (Style): Title style.
- value (Style): Value style.
- selected (Style): Selected value style.

## [completion] {#completion}

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

Icons

- icon_file (String): File icon.
- icon_folder (String): Folder icon.
- icon_command (String): Command icon.

## [tasks] {#tasks}

- border (Style): Border style.
- title (Style): Title style.
- hovered (Style): Hovered item style.

## [which] {#which}

- cols (Number): Number of columns. The value can be `1`, `2`, `3`.
- mask (Style): Mask style.
- cand (Style): Candidate key style.
- rest (Style): Rest key style.
- desc (Style): Description style.
- separator (String): Separator symbol. e.g. `" -> "`.
- separator_style (Style): Separator style.

## [help] {#help}

- on (Style): Key column style.
- run (Style): Command column style.
- desc (Style): Description column style.
- hovered (Style): Hovered item style.
- footer (Style): Footer style.

## [notify] {#notify}

Title: Notification title.

- title_info (Style): Style of the info title.
- title_warn (Style): Style of the warning title.
- title_error (Style): Style of the error title.

Icon: Notification icon.

- icon_info (String): Info icon.
- icon_warn (String): Warning icon.
- icon_error (String): Error icon.

## [filetype] {#filetype}

Set file list item display styles for specific file types, supporting matching by name and mime-type:

```toml
[filetype]
rules = [
	# Images
	{ mime = "image/*", fg = "yellow" },

	# Videos
	{ mime = "video/*", fg = "magenta" },
	{ mime = "audio/*", fg = "magenta" },

	# Empty files
	{ mime = "inode/empty", fg = "cyan" },

	# Orphan symbolic links
	{ name = "*", is = "orphan", fg = "red" },

	# ...

	# Fallback
	# { name = "*", fg = "white" },
	{ name = "*/", fg = "blue" }
]
```

Each rule supports complete [Style properties](#types.style). There are two special rule:

- `name = "*"` matches all files.
- `name = "*/"` matches all directories.

You can restrict the specific type of files through `is`, noting that it must be used with either `name` or `mime`. It accepts the following values:

- `block`: Block device
- `char`: Char device
- `exec`: Executable
- `fifo`: FIFO
- `link`: Symbolic link
- `orphan`: Orphan symbolic link
- `sock`: Socket
- `sticky`: File with sticky bit set

## [icon] {#icon}

Yazi has builtin support for [nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons), a rich set of icons ready to use.
If you want to add your own rules to this set, you can use `prepend_*` and `append_*` to prepend or append rules to the default ones (see [Configuration Mixing](/docs/configuration/overview#mixing) for details):

```toml
[icon]
prepend_dirs = [
	{ name = "desktop", text = "", fg = "#563d7c" },
	# ...
]
append_exts = [
	{ name = "mp3", text = "", fg = "#00afff" },
	# ...
]
# ...
```

If you want to completely override the default rules, you can do so with:

```toml
[icon]
dirs = [
	{ name = "desktop", text = "", fg = "#563d7c" },
	# ...
]
exts = [
	{ name = "mp3", text = "", fg = "#00afff" },
	# ...
]
# ...
```

Each icon rule contains the following properties:

- `name` (globs, dirs, files, exts), or `if` (conds): the rule itself, which is a string
- `text`: icon text, which is a string
- `fg`: icon color, which is a [Color](/docs/configuration/theme#types.color)

Icons are matched according to the following priority:

1. globs: glob expressions, e.g., `{ name = "**/Downloads/*.zip", ... }`
2. dirs: directory names, e.g., `{ name = "Desktop", ... }`
3. files: file names, e.g., `{ name = ".bashrc", ... }`
4. exts: extensions, e.g., `{ name = "mp3", ... }`
5. conds: conditions, e.g., `{ if = "!dir", ... }`

`dirs`, `files`, and `exts` are compiled into a HashMap at startup, offering O(1) time complexity for very fast lookups, which should meet most needs.

For more complex and precise rules, such as matching a specific file in a specific directory, use `globs` - these are always executed first to check if any rules in the glob set are met.
However, they are much slower than `dirs`, `files`, and `exts`, so it's not recommended to use them excessively.

If none of the above rules match, it will fall back to `conds` to check if any specific conditions are met. `conds` are mostly used for rules related to file metadata, which includes the following conditional factors:

- `dir`: The file is a directory
- `hidden`: The file is hidden
- `link`: The file is a symbolic link
- `orphan`: The file is an orphan (broken symbolic link)
- `dummy`: The file is dummy (failed to load complete metadata, possibly the filesystem doesn't support it, such as FUSE)
- `block`: The file is a block device
- `char`: The file is a char device
- `fifo`: The file is a FIFO
- `sock`: The file is a socket
- `exec`: The file is executable
- `sticky`: The file has the sticky bit set

These conditions support basic `|` (or), `&` (and), `!` (not), and `()` for priority, so you can combine them as needed, for example:

```toml
[icon]
prepend_conds = [
	{ if = "hidden & dir",  text = "👻" },  # Hidden directories
	{ if = "dir",           text = "📁" },  # Directories
	{ if = "!(dir | link)", text = "📄" },  # Normal files (not directories or symlinks)
]
```
