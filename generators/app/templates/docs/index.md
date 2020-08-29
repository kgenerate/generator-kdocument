# <%= project.name %>

<%= project.description %>

---

## Links

<%= links.map(item => `- [${item.label}](${item.url})`).join("\n") %>
