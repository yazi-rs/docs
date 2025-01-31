---
sidebar_position: 7
description: Command-line interface for Yazi
---

# CLI

Yazi provides a command-line tool called `ya`, which is used to assist with tasks like plugin management, flavor management, DDS message publishing and subscribing, among other features.

It is an essential component of Yazi. Most distributions include it by default when installing Yazi, but if yours doesn't, you'll need to build it from source. Just be sure that the versions of both `ya` and `yazi` are exactly the same.

## Package Manager

You can manage your plugins and flavors using the `ya pack` subcommand. For example, to install plugins from GitHub repositories, run:

```sh
ya pack -a owner/my-plugin owner2/another-plugin
```

`ya pack` also supports installing subdirectories from  monorepos as a package. For example, to install multiple packages from https://github.com/yazi-rs/plugins/tree/main/, run:

```sh
ya pack -a yazi-rs/plugins:git yazi-rs/plugins:preview
```

and it will automatically clone them from GitHub, copy them to your plugins directory, and update the `package.toml` to lock their versions:

```toml
# ~/.config/yazi/package.toml
[plugin]
deps = [
	{ use = "owner/my-plugin", rev = "0573024" },
	{ use = "owner2/another-plugin", rev = "8b2f391" },
	{ use = "yazi-rs/plugins:git", rev = "9a1129c" },
	{ use = "yazi-rs/plugins:preview", rev = "7d4e012" }
]
```
To remove multiple plugins at once:

```sh
ya pack -d owner/my-plugin yazi-rs/plugins:git
```
To list all the plugins managed by `ya pack`:

```sh
ya pack -l
```

To install all the plugins with locked versions from `package.toml` on a new system:

```sh
ya pack -i
```

To upgrade all the plugins to the latest version:

```sh
ya pack -u
```

If you want to pin a plugin to a specific version so that it doesn't get upgraded when running `ya pack -u`, add an `=` qualifier before the hash in `rev`:

```diff
[plugin]
deps = [
-	{ use = "owner/my-plugin", rev = "9a1129c" }
+	{ use = "owner/my-plugin", rev = "=9a1129c" }
]
```
