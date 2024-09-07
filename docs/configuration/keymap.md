---
sidebar_position: 2
description: Learn how to configure keyboard shortcuts with Yazi.
---

# keymap.toml

:::note
If you haven't created and used your own configuration file yet, please see [Configuration](/docs/configuration/overview).
:::

You can change Yazi's keybindings in your `keymap.toml` file, which consists of the following 6 layers:

- [\[manager\]](#manager) - File list.
- [\[tasks\]](#tasks) - Task manager.
- [\[select\]](#select) - Select component. e.g. "open with" for files.
- [\[input\]](#input) - Input component. e.g. create, rename, etc.
- [\[completion\]](#completion) - Completion component. e.g. "cd" path completion.
- [\[help\]](#help) - Help menu.

In each layer, there are two attributes: `prepend_keymap` and `append_keymap`.
Prepend inserts before [the default keybindings](https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap.toml), while append inserts after them.

Since Yazi selects the first matching key to run, prepend always has a higher priority than default, and append always has a lower priority than default:

```toml
[manager]
prepend_keymap = [
	{ on = "<C-a>", run = 'my-fev-command1', desc = "Just for test!" },
]
append_keymap = [
	{ on = [ "g", "a" ], run = 'my-fev-command2', desc = "Just for test!" },
]
```

Or in another different style:

```toml
[[manager.prepend_keymap]]
on   = "<C-a>"
run  = 'my-fev-command1'
desc = "Just for test!"

[[manager.prepend_keymap]]
on  = [ "g", "a" ]
run = 'my-fev-command2'

[[manager.append_keymap]]
on  = "c"
run = 'my-fev-command3'
```

But keep in mind that you can only choose one of them, and it cannot be a combination of the two, as TOML language does not allow this:

```toml
[manager]
prepend_keymap = [
	{ on = "<C-a>", run = 'my-fev-command1', desc = "Just for test!" },
]

[[manager.prepend_keymap]]
on   = [ "g", "a" ]
run  = 'my-fev-command2'
desc = "Just for test!"
```

When you don't need any default and want to fully customize your keybindings, use `keymap`, for example:

```toml
[manager]
keymap = [
	# This will override all default keybindings, and just keep the two below.
	{ on = "<C-a>",      run = 'my-fev-command1', desc = "Just for test!" },
	{ on = [ "g", "a" ], run = 'my-fev-command2', desc = "Just for test!" },
]
```

## [manager] {#manager}

### `escape` {#manager.escape}

Cancel find, exit visual mode, clear selected, cancel filter, or cancel search.

| Argument/Option | Description          |
| --------------- | -------------------- |
| `--all`         | Do all of the below. |
| `--find`        | Cancel find.         |
| `--visual`      | Exit visual mode.    |
| `--select`      | Clear selected.      |
| `--filter`      | Cancel filter.       |
| `--search`      | Cancel search.       |

Automatically determine the operation by default, and it will only execute the selected operation after specifying the option; multiple options can be stacked.

### `quit` {#manager.quit}

Exit the process.

| Argument/Option | Description                                          |
| --------------- | ---------------------------------------------------- |
| `--no-cwd-file` | Don't write the current directory to the `cwd-file`. |

### `close` {#manager.close}

Close the current tab; if it's the last tab, exit the process instead.

### `arrow` {#manager.arrow}

| Argument/Option | Description                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `[n]` / `[n%]`  | Move the cursor up or down by `n` or `n%` lines. Use negative values to move up and positive values to move down. |

### `leave` {#manager.leave}

Go back to the parent directory of the hovered file, or the parent of the current working directory if no file is hovered on.

### `enter` {#manager.enter}

Enter the child directory.

### `back` {#manager.back}

Go back to the previous directory.

### `forward` {#manager.forward}

Go forward to the next directory.

### `seek` {#manager.seek}

Scroll the contents in the preview panel.

| Argument/Option | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `[n]`           | Use negative values to seek up and positive values to seek down. |

Note that the default scroll keys are <kbd>Alt</kbd> + <kbd>j</kbd> and <kbd>Alt</kbd> + <kbd>k</kbd>, make sure your terminal supports <kbd>Alt</kbd> key combinations, or you can change them in your `keymap.toml`.

### `cd` {#manager.cd}

Change the current directory.

| Argument/Option | Description                              |
| --------------- | ---------------------------------------- |
| `[path]`        | The path to change to.                   |
| `--interactive` | Use an interactive UI to input the path. |

You can add your own `g` series keys to achieve a simple bookmark feature:

```toml
[[manager.prepend_keymap]]
on   = [ "g", "d" ]
run  = "cd ~/Downloads"
desc = "Cd to ~/Downloads"

[[manager.prepend_keymap]]
on   = [ "g", "p" ]
run  = "cd ~/Pictures"
desc = "Cd to ~/Pictures"
```

For Windows users, you can also switch drives using the `cd` command:

```toml
[[manager.prepend_keymap]]
on   = [ "g", "d" ]
run  = "cd D:"
desc = "Switch to D drive"

[[manager.prepend_keymap]]
on   = [ "g", "p" ]
run  = 'cd "E:\\Pictures"'  # We need to escape the backslash
desc = 'Cd to E:\Pictures'
```

Check out the [resources page](/docs/resources) for a more comprehensive bookmark plugin.

### `reveal` {#manager.reveal}

Change the current directory to the parent of specified file, and hover on it.

| Argument/Option | Description         |
| --------------- | ------------------- |
| `[path]`        | The path to reveal. |

### `select` {#manager.select}

| Argument/Option | Description                                              |
| --------------- | -------------------------------------------------------- |
| `--state=true`  | Select the current file.                                 |
| `--state=false` | Deselect the current file.                               |
| `--state=none`  | Default, toggle the selection state of the current file. |

### `select_all` {#manager.select_all}

Select all files in the current working directory.

| Argument/Option | Description                                      |
| --------------- | ------------------------------------------------ |
| `--state=true`  | Select all files                                 |
| `--state=false` | Deselect all files                               |
| `--state=none`  | Default, toggle the selection state of all files |

Note that `--state=false` will deselect all files in the current working directory.

If you have selected files across directories and want to deselect all of them, use [`escape --select`](#manager.escape) instead.

### `visual_mode` {#manager.visual_mode}

Enter visual mode (selection mode).

| Argument/Option | Description                     |
| --------------- | ------------------------------- |
| `--unset`       | Enter visual mode (unset mode). |

### `open` {#manager.open}

Open the selected files using [the rules in `[open]`](/docs/configuration/yazi#open).

| Argument/Option | Description                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| `--interactive` | Open the hovered/selected file(s) with an interactive UI to choose the opening method. |
| `--hovered`     | Always open the hovered file regardless of the selection state.                        |

### `yank` {#manager.yank}

Yank the selected files.

| Argument/Option | Description             |
| --------------- | ----------------------- |
| `--cut`         | Cut the selected files. |

### `unyank` {#manager.unyank}

Cancel the yank status of files.

### `paste` {#manager.paste}

Paste the yanked files.

| Argument/Option | Description                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `--force`       | Overwrite the destination file if it exists.                                                               |
| `--follow`      | Copy the file pointed to by a symbolic link, rather than the link itself. Only can be used during copying. |

### `link` {#manager.link}

Create a symbolic link to the yanked files. (This is a privileged action in Windows and must be run as an administrator.)

| Argument/Option | Description                                  |
| --------------- | -------------------------------------------- |
| `--relative`    | Use a relative path for the symbolic link.   |
| `--force`       | Overwrite the destination file if it exists. |

### `hardlink` {#manager.hardlink}

Hardlink the yanked files.

| Argument/Option | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `--force`       | Overwrite the destination file if it exists.                             |
| `--follow`      | Hardlink the file pointed to by a symbolic link, not the symlink itself. |

### `remove` {#manager.remove}

Move the files to the trash/recycle bin on macOS/Windows. For Linux, it will follow [The FreeDesktop.org Trash specification](https://specifications.freedesktop.org/trash-spec/trashspec-1.0.html).

In the Android platform, you can only use it with the `--permanently` option, since there lacks the concept of a trash bin.

| Argument/Option | Description                                                          |
| --------------- | -------------------------------------------------------------------- |
| `--force`       | Don't show the confirmation dialog, and trash/delete files directly. |
| `--permanently` | Permanently delete the files.                                        |
| `--hovered`     | Always remove the hovered file regardless of the selection state.    |

### `create` {#manager.create}

Create a file or directory. Ends with `/` (Unix) or `\` (Windows) for directories.

| Argument/Option | Description                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `--dir`         | Always create directories, regardless of whether end with `/` or `\`.                          |
| `--force`       | Overwrite the destination file directly if it exists, without showing the confirmation dialog. |

### `rename` {#manager.rename}

Rename a file or directory, or bulk rename if multiple files are selected (`$EDITOR` is used to edit the filenames by default).

- `--hovered`: Always rename the hovered file regardless of the selection state.
- `--force`: Overwrite the destination file directly if it exists, without showing the confirmation dialog.
- `--empty`: Empty a part of the filename.
  - `"stem"`: Empty the stem. e.g. `"foo.jpg"` -> `".jpg"`.
  - `"ext"`: Empty the extension. e.g. `"foo.jpg"` -> `"foo."`.
  - `"dot_ext"`: Empty the dot and extension. e.g. `"foo.jpg"` -> `"foo"`.
  - `"all"`: Empty the whole filename. e.g. `"foo.jpg"` -> `""`.
- `--cursor`: Specify the cursor position of the renaming input box.
  - `"end"`: The end of the filename.
  - `"start"`: The start of the filename.
  - `"before_ext"`: Before the extension of the filename.

You can also use `--cursor` with `--empty`, for example, `rename --empty=stem --cursor=start` will empty the file's stem, and move the cursor to the start.

Which causes the input box content for the filename `foo.jpg` to be `|.jpg`, where "|" represents the cursor position.

### `copy` {#manager.copy}

Copy the path of files or directories that are selected or hovered on.

| Argument/Option    | Description                                      |
| ------------------ | ------------------------------------------------ |
| `path`             | Copy the absolute path.                          |
| `dirname`          | Copy the path of the parent directory.           |
| `filename`         | Copy the name of the file.                       |
| `name_without_ext` | Copy the name of the file without the extension. |

### `shell` {#manager.shell}

Run a shell command.

| Argument/Option | Description                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[template]`    | Optional, command template to be run.                                                                                                                                                                                                    |
| `--block`       | Open in a blocking manner. After setting this, Yazi will hide into a secondary screen and display the program on the main screen until it exits. During this time, it can receive I/O signals, which is useful for interactive programs. |
| `--orphan`      | Keep the process running even if Yazi has exited, once specified, the process will be detached from the task scheduling system.                                                                                                          |
| `--confirm`     | When the template is provided, run it directly, no input box was shown. It's mutually exclusive with `--interactive`.                                                                                                                    |
| `--interactive` | Request the user to input the command to be ran interactively. It's mutually exclusive with `--confirm`.                                                                                                                                 |
| `--cursor`      | Set the initial position of the cursor in the interactive command input box. For example, `shell 'zip -r .zip "$0"' --cursor=7 --interactive` places the cursor before `.zip`.                                                           |

You can use the following shell variables in `[run]`:

- `$n` (Unix) / `%n` (Windows): The N-th selected file, starting from `1`. e.g. `$2` represents the second selected file.
- `$@` (Unix) / `%*` (Windows): All selected files, i.e. `$1`, `$2`, ..., `$n`.
- `$0` (Unix) / `%0` (Windows): The hovered file.

### `hidden` {#manager.hidden}

Set the visibility of hidden files.

| Argument/Option | Description                       |
| --------------- | --------------------------------- |
| `show`          | Show hidden files.                |
| `hide`          | Hide hidden files.                |
| `toggle`        | Default, toggle the hidden state. |

### `linemode` {#manager.linemode}

Set the [line mode](/docs/configuration/yazi#manager.linemode).

| Argument/Option | Description                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `none`          | No line mode.                                                                                                                                                                                           |
| `size`          | Display the size in bytes of the file. Note that currently directory sizes are only evaluated when [`sort_by = "size"`](/docs/configuration/yazi#manager.sort_by), and this might change in the future. |
| `ctime`         | Display the creation time of the file.                                                                                                                                                                  |
| `mtime`         | Display the last modified time of the file.                                                                                                                                                             |
| `permissions`   | Display the permissions of the file, only available on Unix-like systems.                                                                                                                               |
| `owner`         | Display the owner of the file, only available on Unix-like systems.                                                                                                                                     |

### `search` {#manager.search}

| Argument/Option | Description                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `[engine]`      | Search engine, available values: [`fd`](https://github.com/sharkdp/fd), [`rg`](https://github.com/BurntSushi/ripgrep), `none` (cancel search) |
| `--args`        | Additional arguments passed to the specified engine, for example `search fd --args='-e -H'`                                                   |

You can search with an empty keyword (`""`) via `fd` to achieve flat view.

<details>
  <summary>Demonstrate flat view</summary>
	<p>Original post: https://github.com/sxyazi/yazi/issues/676#issuecomment-1943494129</p>
	<video src="https://github.com/sxyazi/yazi/assets/17523360/d2c9df9b-b7ef-41ec-889f-26b2f1117cd0" width="100%" controls muted></video>
</details>

Or bind a key to the `search_do` command to quickly switch to the flat view:

```toml
[[manager.prepend_keymap]]
on   = [ "g", "f" ]
run  = 'search_do --via=fd --args="-d 3"'
desc = "Switch to the flat view with a max depth of 3"
```

### `find` {#manager.find}

| Argument/Option | Description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[query]`       | Optional, the query to find for. If not provided, an interactive UI will be used to input with.                          |
| `--previous`    | Find for the previous occurrence.                                                                                        |
| `--smart`       | Use smart-case when finding, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive. |
| `--insensitive` | Use case-insensitive find.                                                                                               |

### `find_arrow` {#manager.find_arrow}

Move the cursor to the next or previous occurrence.

| Argument/Option | Description                      |
| --------------- | -------------------------------- |
| `--previous`    | Move to the previous occurrence. |

### `filter` {#manager.filter}

| Argument/Option | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `[query]`       | Optional, the query to filter for. If not provided, an interactive UI will be used to input with.                          |
| `--smart`       | Use smart-case when filtering, i.e. case-sensitive if the query contains uppercase characters, otherwise case-insensitive. |
| `--insensitive` | Use case-insensitive filter.                                                                                               |

### `sort` {#manager.sort}

- `[by]`: Optional, if not provided, the sort method will be kept unchanged.
  - `"none"`: Don't sort.
  - `"modified"`: Sort by last modified time.
  - `"created"`: Sort by creation time. (Due to a Rust bug, this is not available at the moment, see [sxyazi/yazi#356](https://github.com/sxyazi/yazi/issues/356) and [rust-lang/rust#108277](https://github.com/rust-lang/rust/issues/108277))
  - `"extension"`: Sort by file extension.
  - `"alphabetical"`: Sort alphabetically, e.g. `1.md` < `10.md` < `2.md`
  - `"natural"`: Sort naturally, e.g. `1.md` < `2.md` < `10.md`
  - `"size"`: Sort by file size.
  - `"random"`: Sort randomly.
- `--reverse`: Display files in reverse order. `--reverse` or `--reverse=yes` to reverse, `--reverse=no` to cancel.
- `--dir-first`: Display directories first. `--dir-first` or `--dir-first=yes` to enable, `--dir-first=no` to cancel.
- `--translit`: Transliterate filenames for sorting, see [sort_translit](/docs/configuration/yazi#manager.sort_translit) for details. `--translit` or `--translit=yes` to enable, `--translit=no` to cancel.

### `tab_create` {#manager.tab_create}

| Argument/Option | Description                                          |
| --------------- | ---------------------------------------------------- |
| `[path]`        | Optional, create a new tab using the specified path. |
| `--current`     | Optional, create a new tab using the current path.   |

If neither `[path]` nor `--current` is specified, will use the startup directory to create the tab.

### `tab_close` {#manager.tab_close}

| Argument/Option | Description                                     |
| --------------- | ----------------------------------------------- |
| `[n]`           | Close the tab at position `n`, starting from 0. |

### `tab_switch` {#manager.tab_switch}

| Argument/Option | Description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[n]`           | Switch to the tab at position `n`, starting from 0.                                                                      |
| `--relative`    | Switch to the tab at a position relative to the current tab. The value of `n` can be negative when using this parameter. |

### `tab_swap` {#manager.tab_swap}

| Argument/Option | Description                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `[n]`           | Swap the current tab with the tab at position `n`, where negative values move the tab forward, and positive values move it backward. |

### `tasks_show` {#manager.tasks_show}

Show the task manager.

### `help` {#manager.help}

Open the help menu.

### `plugin` {#manager.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

## [tasks] {#tasks}

### `close` {#tasks.close}

Hide the task manager.

### `arrow` {#tasks.arrow}

| Argument/Option | Description                  |
| --------------- | ---------------------------- |
| `-1`            | Move the cursor up 1 line.   |
| `1`             | Move the cursor down 1 line. |

### `inspect` {#tasks.inspect}

Inspect the task (press `q` to exit the inspect view).

### `cancel` {#tasks.cancel}

Cancel the task.

### `help` {#tasks.help}

Open the help menu.

### `plugin` {#tasks.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

## [select] {#select}

### `close` {#select.close}

Cancel selection.

| Argument/Option | Description           |
| --------------- | --------------------- |
| `--submit`      | Submit the selection. |

### `arrow` {#select.arrow}

| Argument/Option | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `[n]`           | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `help` {#select.help}

Open the help menu.

### `plugin` {#select.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

## [input] {#input}

### `close` {#input.close}

Cancel input.

| Argument/Option | Description       |
| --------------- | ----------------- |
| `--submit`      | Submit the input. |

### `escape` {#input.escape}

Go back the normal mode, or cancel input.

### `move` {#input.move}

Move the cursor left or right.

| Argument/Option  | Description                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `[n]`            | Move the cursor `n` characters left or right. Negative value for left, positive value for right. |
| `--in-operating` | Move the cursor only if its currently waiting for an operation.                                  |

### `backward` {#input.backward}

Move back to the start of the current or previous word.

### `forward` {#input.forward}

Move forward to the start of the next word.

| Argument/Option | Description                                          |
| --------------- | ---------------------------------------------------- |
| `--end-of-word` | Move forward to the end of the current or next word. |

### `insert` {#input.insert}

Enter insert mode. This command is only available in normal mode.

| Argument/Option | Description              |
| --------------- | ------------------------ |
| `--append`      | Insert after the cursor. |

### `visual` {#input.visual}

Enter visual mode. This command is only available in normal mode.

### `delete` {#input.delete}

Delete the selected characters. This command is only available in normal mode.

| Argument/Option | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `--cut`         | Cut the selected characters into clipboard, instead of only deleting them. |
| `--insert`      | Delete and enter insert mode.                                              |

### `yank` {#input.yank}

Copy the selected characters. This command is only available in normal mode.

### `paste` {#input.paste}

Paste the copied characters after the cursor. This command is only available in normal mode.

| Argument/Option | Description                                    |
| --------------- | ---------------------------------------------- |
| `--before`      | Paste the copied characters before the cursor. |

### `undo` {#input.undo}

Undo the last operation. This command is only available in normal mode.

### `redo` {#input.redo}

Redo the last operation. This command is only available in normal mode.

### `help` {#input.help}

Open the help menu. This command is only available in normal mode.

### `backspace` {#input.backspace}

Delete the character before the cursor. This command is only available in insert mode.

| Argument/Option | Description                            |
| --------------- | -------------------------------------- |
| `--under`       | Delete the character under the cursor. |

### `kill` {#input.kill}

Kill the specified range of characters. This command is only available in insert mode.

| Argument/Option | Description                                      |
| --------------- | ------------------------------------------------ |
| `bol`           | Kill backwards to the BOL.                       |
| `eol`           | Kill forwards to the EOL.                        |
| `backward`      | Kill backwards to the start of the current word. |
| `forward`       | Kill forwards to the end of the current word.    |

### `plugin` {#input.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin). This command is only available in insert mode.

## [completion] {#completion}

### `close` {#completion.close}

Hide the completion menu.

| Argument/Option | Description            |
| --------------- | ---------------------- |
| `--submit`      | Submit the completion. |

### `close_input` {#completion.close_input}

Close the input box. Arguments are the same as [`[input] close`](#input.close).

### `arrow` {#completion.arrow}

| Argument/Option | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `[n]`           | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `help` {#completion.help}

Open the help menu.

### `plugin` {#completion.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).

## [help] {#help}

### `close` {#help.close}

Hide the help menu.

### `escape` {#help.escape}

Clear the filter, or hide the help menu.

### `arrow` {#help.arrow}

| Argument/Option | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `[n]`           | Move the cursor up or down `n` lines. Negative value for up, positive value for down. |

### `filter` {#help.filter}

Apply a filter for the help items.

### `plugin` {#help.plugin}

See [Functional plugin](/docs/plugins/overview#functional-plugin).
