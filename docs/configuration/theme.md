---
sidebar_position: 3
description: Learn how to configure your Yazi theme.
---

# theme.toml

:::tip
If you're looking for ready-made themes and don't want to create one yourself, check out the [yazi-rs/themes](https://github.com/yazi-rs/themes) repository.
:::

## Types

- Color: A color. It can be in Hex format with RGB values, such as `#484D66`. Or can be one of the following 17 values:

  - reset
  - black
  - white
  - red
  - lightred
  - green
  - lightgreen
  - yellow
  - lightyellow
  - blue
  - lightblue
  - magenta
  - lightmagenta
  - cyan
  - lightcyan
  - gray
  - darkgray

- Style: Appears in a format similar to `{ fg = "#e4e4e4", bg = "black", ... }`, and supports the following properties:
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

## [manager]

- cwd (Style): CWD text style.

Hovered:

- hovered (Style): Hovered file style.
- preview_hovered (Style): Hovered file style, in the preview pane.

Find: The `find` feature

- find_keyword (Style): Style of the highlighted portion in the filename.
- find_position (Style): Style of current file location in all found files to the right of the filename.

Marker: Color block on the left side separator line in the filename.

- marker_selected (Style): Selected file marker style.
- marker_copied (Style): Copied file marker style.
- marker_cut (Style): Cut file marker style.

Tab: Tab bar

- tab_active (Style): Active tab style.
- tab_inactive (Style): Inactive tab style.
- tab_width (Number): Tab maximum width. When set to a value greater than 2, the remaining space will be filled with the tab name, which is current directory name.

Border:

- border_symbol (String): Border symbol. e.g. `"│"`.
- border_style (Style): Border style.

Highlighting: The built-in syntax highlighting feature

- syntect_theme (String): Theme file path ending with ".tmTheme", used by syntect. e.g. `"~/my-themes/Dracula.tmTheme"`.

  Yazi and `bat` use the same highlighter [syntect](https://crates.io/crates/syntect), so you can directly use [bat's theme files](https://github.com/sharkdp/bat/tree/master/assets/themes).
  You can also find more available themes on GitHub by using the keyword "tmTheme".

## [status]

- separator_open (String): Opening separator symbol. e.g. `"["`.
- separator_close (String): Closing separator symbol. e.g. `"]"`.
- separator_style (Style): Separator style.

Mode

- mode_normal (Style): Normal mode style.
- mode_select (Style): Select mode style.
- mode_unset (Style): Unset mode style.

Progress

- progress_label (Style): Progress label style.
- progress_normal (Style): Style of the progress bar when it is not in an error state.
- progress_error (Style): Style of the progress bar when an error occurs.

Permissions

- permissions_t (Style): File type.
- permissions_r (Style): Read permission.
- permissions_w (Style): Write permission.
- permissions_x (Style): Execute permission.
- permissions_s (Style): `-` separator.

## [select]

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

## [input]

- border (Style): Border style.
- title (Style): Title style.
- value (Style): Value style.
- selected (Style): Selected value style.

## [completion]

- border (Style): Border style.
- active (Style): Selected item style.
- inactive (Style): Unselected item style.

Icons

- icon_file (String): File icon.
- icon_folder (String): Folder icon.
- icon_command (String): Command icon.

## [tasks]

- border (Style): Border style.
- title (Style): Title style.
- hovered (Style): Hovered item style.

## [which]

- cols (Number): Number of columns. The value can be `1`, `2`, `3`.
- mask (Style): Mask style.
- cand (Style): Candidate key style.
- rest (Style): Rest key style.
- desc (Style): Description style.
- separator (String): Separator symbol. e.g. `" -> "`.
- separator_style (Style): Separator style.

## [help]

- on (Style): Key column style.
- exec (Style): Command column style.
- desc (Style): Description column style.
- hovered (Style): Hovered item style.
- footer (Style): Footer style.

## [filetype]

Set file list item display styles for specific file types, supporting matching by name and mime-type:

```toml
[filetype]
rules = [
	# Images
	{ mime = "image/*", fg = "cyan" },

	# Videos
	{ mime = "video/*", fg = "yellow" },
	{ mime = "audio/*", fg = "yellow" },

	# Orphan symbolic links
	{ name = "*", is = "orphan", fg = "red" },

	# ...

	# Fallback
	# { name = "*", fg = "white" },
	{ name = "*/", fg = "blue" }
]
```

Each rule supports complete [Style properties](#types). There are two special rule:

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

## [icon]

Display icon based on file name rules, noting that the `/` after the name signifies that it's a directory.

```toml
[icon]

rules = [
	{ name = "*.rs"    , text = "" },
	{ name = "Desktop/", text = "" },
	# ...

	# Icon with a color
	{ name = "*.lua", text = "", fg = "#51a0cf" },

	# Default
	{ name = "*" , text = "" },
	{ name = "*/", text = "" },
]
```

Similarly, `*` and `*/` can be used for fallback matching all files and all directories. You can also use `fg` to set the icon color.

The above rules use icons from [Nerd Fonts](https://www.nerdfonts.com), and they will not display properly if you don't have a Nerd Font installed.
