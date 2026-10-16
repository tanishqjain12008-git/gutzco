<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the brand experience on one scrolling home route and purchasing on a separate checkout route, because navigation must scroll within the story while checkout has its own flow.
- Use shared pure shop rules for checkout pricing and delivery validation, because totals and validation must remain consistent and testable.
- Keep demo purchasing in React state without storing personal details or collecting payment credentials, because this project is a demonstration and not a live store.
- Serve media from public/assets via src/lib/media.ts, because the site must also deploy outside Lovable (e.g. Vercel) with all files in the repo.
