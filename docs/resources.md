---
sidebar_position: 10
description: Some awesome plugins for Yazi.
---

# Resources

:::warning
The plugin system is still in the early stage, and most of the plugins below only guarantee compatibility with the latest code of Yazi!

Please make sure that both your Yazi and plugins are on the `HEAD` to ensure proper functionality!
:::

## 🖼️ Previewers {#previewers}

Markdown:

- [glow.yazi](https://github.com/Reledia/glow.yazi) - Preview markdown files using [glow](https://github.com/charmbracelet/glow).
- [mdcat.yazi](https://github.com/GrzegorzKozub/mdcat.yazi) - Preview markdown files using [mdcat](https://github.com/swsnr/mdcat).

CSV:

- [miller.yazi](https://github.com/Reledia/miller.yazi) - Preview CSV files (and other supported formats) using [miller](https://github.com/johnkerl/miller).

Binary:

- [hexyl.yazi](https://github.com/Reledia/hexyl.yazi) - Using [hexyl](https://github.com/sharkdp/hexyl) as the fallback previewer for files.

Media:

- [exifaudio.yazi](https://github.com/Sonico98/exifaudio.yazi) - Preview audio metadata and cover using [exiftool](https://exiftool.org/).
- [mediainfo.yazi](https://github.com/boydaihungst/mediainfo.yazi) - Preview image, audio, video, and subtitle files using `ffmpegthumbnailer` and `mediainfo`.

Archives:

- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An [ouch](https://github.com/ouch-org/ouch) plugin for Yazi, supporting preview and compression.

Directories:

- [eza-preview.yazi](https://github.com/sharklasers996/eza-preview.yazi) - Preview directories using `eza`, can be switched between list and tree modes.

BitTorrent:

- [torrent-preview.yazi](https://github.com/kirasok/torrent-preview.yazi) - Preview "\*.torrent" files using [transmission-cli](https://github.com/transmission/transmission).

Jupyter notebooks:

- [nbpreview.yazi](https://github.com/AnirudhG07/nbpreview.yazi) - Preview jupyter notebooks(\*.ipynb) files using [nbpreview](https://github.com/paw-lu/nbpreview).

Misc:

- [rich-preview.yazi](https://github.com/AnirudhG07/rich-preview.yazi) - Preview Markdown, JSON, CSV, etc. using [rich-cli](https://github.com/textualize/rich-cli)

## 🧩 Functional plugins {#functional}

Jumping:

- [relative-motions.yazi](https://github.com/dedukun/relative-motions.yazi) - A Yazi plugin based about vim motions.
- [jump-to-char.yazi](https://github.com/yazi-rs/plugins/tree/main/jump-to-char.yazi) - Vim-like `f<char>`, jump to the next file whose name starts with `<char>`.
- [first-non-directory.yazi](https://github.com/lpanebr/yazi-plugins/tree/main/first-non-directory.yazi) - Skip directories and jump to the first file with one keypress.
- [time-travel.yazi](https://github.com/iynaix/time-travel.yazi) - Browse forwards and backwards in time via BTRFS / ZFS snapshots.

Bookmarks:

- [bookmarks.yazi](https://github.com/dedukun/bookmarks.yazi) - A Yazi plugin that adds the basic functionality of Vi-like marks.
- [mactag.yazi](https://github.com/yazi-rs/plugins/tree/main/mactag.yazi) - Bring macOS's awesome tagging feature to Yazi! The plugin is only available for macOS just like the name says.
- [yamb.yazi](https://github.com/h-hg/yamb.yazi) - Yet another bookmarks plugins. It supports persistence, jumping by a key, jumping by [fzf](https://github.com/junegunn/fzf).
- [bunny.yazi](https://github.com/stelcodes/bunny.yazi) - Simple bookmarks menu with fuzzy searching and an option to mark a single directory.

Tabs:

- [projects.yazi](https://github.com/MasouShizuka/projects.yazi) - Save all tabs and their states as a project, and restore them at any time.

File actions:

- [chmod.yazi](https://github.com/yazi-rs/plugins/tree/main/chmod.yazi) - Execute `chmod` on the selected files to change their mode.
- [diff.yazi](https://github.com/yazi-rs/plugins/tree/main/diff.yazi) - Diff the selected file with the hovered file, create a living patch, and copy it to the clipboard.
- [compress.yazi](https://github.com/KKV9/compress.yazi) - A Yazi plugin that compresses selected files to an archive.
- [ouch.yazi](https://github.com/ndtoan96/ouch.yazi) - An [ouch](https://github.com/ouch-org/ouch) plugin for Yazi, supporting preview and compression.
- [archivemount.yazi](https://github.com/AnirudhG07/archivemount.yazi) - Mounting and unmounting archives in yazi using [archivemount](https://github.com/cybernoid/archivemount).
- [fuse-archive](https://github.com/dawsers/fuse-archive.yazi) - Mount and unmount archives transparently while navigating in yazi with [fuse-archive](https://github.com/google/fuse-archive).
- [reflink.yazi](https://github.com/Ape/reflink.yazi) - Create reflinks to files.
- [rsync.yazi](https://github.com/GianniBYoung/rsync.yazi) - Simple rsync copying locally and to remote servers.
- [what-size.yazi](https://github.com/pirafrank/what-size.yazi) - Calculate total size of current selection or of current working directory.
- [lazygit.yazi](https://github.com/Lil-Dank/lazygit.yazi) - Manage Git directories with [lazygit](https://github.com/jesseduffield/lazygit) with a quick shortcut.
- [sudo.yazi](https://github.com/TD-Sky/sudo.yazi) - Execute specific file operations with `sudo` privileges.
- [replace.yazi](https://github.com/shuizhongyueming/replace.yazi) - Replace the currently hovered file/folder with previously yanked items.
- [restore.yazi](https://github.com/boydaihungst/restore.yazi) - Restore/recover latest deleted files/folders using `trash-cli`.
- [simple-mtpfs.yazi](https://github.com/boydaihungst/simple-mtpfs.yazi) - Mounting MTP devices (Android, Camera, etc) using `simple-mtpfs` (for Linux only).

Clipboard:

- [copy-file-contents.yazi](https://github.com/AnirudhG07/plugins-yazi/tree/main/copy-file-contents.yazi) - A simple plugin to copy file contents just from Yazi without going into editor.
- [system-clipboard.yazi](https://github.com/orhnk/system-clipboard.yazi) - Cross platform implementation of a simple system clipboard.
- [wl-clipboard.yazi](https://github.com/grappas/wl-clipboard.yazi) - Wayland implementation of a simple system clipboard.
- [path-from-root.yazi](https://github.com/aresler/path-from-root.yazi) - Copy file path relative to git root

`filter` enhancements:

- [smart-filter.yazi](https://github.com/yazi-rs/plugins/tree/main/smart-filter.yazi) - Makes filters smarter: continuous filtering, automatically enter unique directory, open file on submitting.

`enter` enhancements:

- [bypass.yazi](https://github.com/Rolv-Apneseth/bypass.yazi) - Yazi plugin for skipping directories with only a single sub-directory.
- [fast-enter.yazi](https://github.com/ourongxing/fast-enter.yazi) - Auto-decompress archives and enter them, or enter the deepest directory until it's not the only subdirectory.

`shell` enhancements:

- [open-with-cmd.yazi](https://github.com/Ape/open-with-cmd.yazi) - Open files using a prompted command.

General command enhancements:

- [augment-command.yazi](https://github.com/hankertrix/augment-command.yazi) - Enhances a few Yazi commands with better handling of the choice between selected items and the hovered item.

UI enhancements:

- [full-border.yazi](https://github.com/yazi-rs/plugins/tree/main/full-border.yazi) - Add a full border to Yazi to make it look fancier.
- [max-preview.yazi](https://github.com/yazi-rs/plugins/tree/main/max-preview.yazi) - Maximize or restore the preview pane.
- [hide-preview.yazi](https://github.com/yazi-rs/plugins/tree/main/hide-preview.yazi) - Switch the preview pane between hidden and shown.
- [git.yazi](https://github.com/yazi-rs/plugins/tree/main/git.yazi) - Show the status of Git file changes as linemode in the file list.
- [mount.yazi](https://github.com/yazi-rs/plugins/tree/main/mount.yazi) - A mount manager for Yazi, providing disk mount, unmount, and eject functionality.
- [starship.yazi](https://github.com/Rolv-Apneseth/starship.yazi) - Starship prompt plugin for Yazi.
- [omp.yazi](https://github.com/saumyajyoti/omp.yazi) - oh-my-posh prompt plugin for Yazi.
- [yatline.yazi](https://github.com/imsi32/yatline.yazi) - Customize header-line and status-line with an easy configuration.
- [simple-status.yazi](https://github.com/Ape/simple-status.yazi) - Minimalistic status line with useful file attribute information.
- [no-status.yazi](https://github.com/yazi-rs/plugins/tree/main/no-status.yazi) - Remove the status bar.
- [dual-pane.yazi](https://github.com/dawsers/dual-pane.yazi) - Dual pane navigation for Yazi like vifm or midnight commander.
- [toggle-view.yazi](https://github.com/dawsers/toggle-view.yazi) - Toggle on or off the parent, current or preview panels.

## 🚀 Preloaders {#preloaders}

Images:

- [allmytoes.yazi](https://github.com/Sonico98/allmytoes.yazi) - Preview freedesktop-compatible thumbnails using [allmytoes](https://gitlab.com/allmytoes/allmytoes).
- [sips-preview.yazi](https://github.com/andreas-timm/sips-preview.yazi) -
  Quick previews of images on macOS. It focuses on PSD (Photoshop) files but also supports other image formats, utilizing the sips command-line tool.

## 🔍Fetchers {#fetchers}

Mime-type:

- [`mime-ext.yazi`](https://github.com/yazi-rs/plugins/tree/main/mime-ext.yazi) - A mime-type provider based on a file extension database, replacing the builtin `file(1)` to speed up mime-type retrieval at the expense of accuracy.

## 📝 (Neo)vim plugins {#vim}

Neovim:

- [yazi.nvim](https://github.com/mikavilpas/yazi.nvim) - A Neovim plugin for the yazi terminal file manager.
- [tfm.nvim](https://github.com/Rolv-Apneseth/tfm.nvim) - Neovim plugin for terminal file manager integration.
- [fm-nvim](https://github.com/Eric-Song-Nop/fm-nvim) - Neovim plugin that lets you use your favorite terminal file managers.

Vim:

- [yazi.vim](https://github.com/chriszarate/yazi.vim) - Vim plugin for Yazi.

## 📝 Helix {#helix}

- [Yazelix](https://github.com/luccahuguet/yazelix) - Adding a file tree to Helix & helix-friendly keybindings for Zellij
- [Zide](https://github.com/josephschmitt/zide) - Group of configuration files and scripts to create an IDE-like experience in zellij

## 🐚 Shell plugins {#shell}

- [yazi-prompt.sh](https://github.com/Sonico98/yazi-prompt.sh) - Display an indicator in your prompt when running inside a yazi subshell.
- [custom-shell.yazi](https://github.com/AnirudhG07/custom-shell.yazi) - Run any commands through your default system shell.
- [command.yazi](https://github.com/KKV9/command.yazi) - Display a prompt for executing yazi commands.

## 🛠️ Utilities {#utilities}

- [icons-brew.yazi](https://github.com/lpnh/icons-brew.yazi) - Make a hot `theme.toml` for your Yazi icons with your favorite color palette.
- [lsColorsToToml](https://github.com/Mellbourn/lsColorsToToml) - Generate the color rules for the `[filetype]` section in `theme.toml` based on your `$LS_COLORS`.

## 💖 Add yours {#add-yours}

We are so happy to add your plugin to this page!

If your plugin meets the following requirements, please click "Edit this page" below to add it:

- **Functional** - we will install and test it, since we want all links included on this page to be valid. If it's available only on a specific platform, a note should be added in the README.
- **Follow conventions** - it should be a directory/repository ending with `.yazi`, and include the files listed in the [plugin documentation](/docs/plugins/overview).

If it's a Neovim or shell plugin, appending `.nvim` or `.sh` to the name to make it distinguishable is a best practice, but it's not required.
