---
sidebar_position: 4
description: Learn how to use Yazi's Lua API.
---

# Config

## Builtin

### `archive`

Preview the hovered archive.

### `code`

<!-- TODO -->

### `dds`

Refer to [DDS#dds.lua](/docs/dds#dds.lua)

### `file`

Reveal type of the hovered file.

### `folder`

Preview the hovered folder.

### `font`

<!-- TODO -->

### `fzf`

<!-- TODO: doesn't work -->

### `image`

Preview the hovered image.

### `json`

Preview the hovered json using [jq](https://jqlang.github.io/jq/).

### `magick`

<!-- TODO -->

### `mime`

Determine and maintain mime types of files.

### `noop`

Do nothing.

### `pdf`

Preview the hovered PDF.

### `session`

Refer to [DDS#session.lua](/docs/dds#session.lua)

### `video`

Preview the hovered video.

### `zoxide`

Jump to a directory using zoxide.

Default config:

```lua
opts = {
    ---@type boolean
    --- Subscribe `cd` event and add destination to
    --- zoxide database everytime
    update_db = false,
}
```
