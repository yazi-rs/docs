---
id: overview
sidebar_position: 0
sidebar_label: Plugin
description: Learn how to extend Yazi with Lua plugins.
---

# Plugins (BETA)

You can extend Yazi's functionality through Lua plugins, which need to be placed in the `plugins` subdirectory of Yazi's configuration directory, so either:

- `~/.config/yazi/plugins/` on Unix/Unix-like systems.
- `C:\Users\USERNAME\AppData\Roaming\yazi\config\plugins\` on Windows.

```
.
├── init.lua
├── plugins/
│   ├── fzf.yazi/
│   └── zoxide.yazi/
└── yazi.toml
```

Each plugin is a directory ending with `.yazi`, containing an `init.lua` file for the plugin's initialization.
For instance, the structure of the `zoxide.yazi` plugin is as:

```
zoxide.yazi/
└── init.lua
```
