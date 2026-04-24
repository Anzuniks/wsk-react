# Week 4 — React (tehtävät + linkit)

Tähän dokumenttiin on koottu Week 4 tehtävät, mitä olen tehnyt, sekä linkit toteutuksiin ja brancheihin.

## 1) First Components (React basics)
**Materiaali:** `Week4/01-react-start.md`

**Linkit:**
- Branch: `https://github.com/Anzuniks/wsk-react/tree/first-component`

---

## 2) State management (selectedItem + SingleView)
**Materiaali:** `Week4/02-react-state.md`

**Linkit:**
- Branch: `https://github.com/Anzuniks/wsk-react/tree/state-management`

---

## 3) Routing (React Router)
**Materiaali:** `Week4/03-react-routing.md`

**Linkit:**
- Branch: `https://github.com/Anzuniks/wsk-react/tree/routing`
- Demo (julkaisu): `https://users.metropolia.fi/~andersnu/wsk-routing/`

---

## 4) Hooks (useEffect + datan haku)
**Materiaali:** `Week4/04-hooks.md`

### Lab assignment 1 (JSON -> useEffect)
**Linkit:**
- Branch: `https://github.com/Anzuniks/wsk-react/tree/hooks`
- Demo (julkaisu): `https://users.metropolia.fi/~andersnu/hooks/`

### Lab assignment 2 (Media API + User API + Promise.all)
**Huom:** Tehty `hooks-lab2` branchiin ja julkaistu samaan `hooks/`-polkuun.

**Linkit:**
- Branch: `https://github.com/Anzuniks/wsk-react/tree/hooks-lab2`
- Demo (julkaisu): `https://users.metropolia.fi/~andersnu/hooks/`

---

# Week 6 — Tailwind CSS (Lab 1–3)

## Tailwind CSS

## Lab assignment 1

1. Continue last exercise. Create a new branch 'tailwind' with git.
2. Rename `index.css` to `index-old.css`, then create new `index.css`
3. [Install Tailwind CSS to your project.](https://tailwindcss.com/docs/guides/vite#react)
4. [Editor setup.](https://tailwindcss.com/docs/editor-setup)
5. Use [@layer base](https://tailwindcss.com/docs/adding-custom-styles#adding-base-styles) to convert `:root` and `#root` rules from `index_old.css` to Tailwind (in index.css) to get the basic styles back to the app.
8. Open `Layout.jsx` and add the same styles to the `Layout` component as you had before, but use Tailwind CSS classes instead of CSS.
   - Start with `ul` and `li` elements in `Nav` component. Use [Tailwind CSS docs](https://tailwindcss.com/docs) to
     find the right classes. The old styles are in `index_old.css` if you need to check them.
9. Do you really need to add the same styles to all `<li>` components? Isn't that repeating yourself? [Yes it is. And it is supposed to be like that.](https://tailwindcss.com/docs/reusing-styles#/dashboard)
   - You can however use pseudo classes like `*:` to [add styles to direct children](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-direct-children) of e.g. `ul` element.
10. Go through `index_old.css` and make the app look like it did before (or better) with Tailwind CSS classes.
    - [Colors](https://tailwindcolor.com/)
    - [Default spacing](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale)
    - [Font size](https://tailwindcss.com/docs/font-size)

## Lab assignment 2

1. Continue in the same branch.
2. In this exercise we'll add two buttons to `MediaRow` component: `Modify` and `Delete` which are shown only when the user is logged in. At this point the buttons don't do anything but console.log something.
3. Use `useUserContext()` to get the `user` from the context.
4. Add the buttons to the `MediaRow` component. Use Tailwind CSS classes to style the buttons the same way as the `Show` button/`View` link is styled.
5. Use conditional rendering to show the buttons only when the user is logged in and the user is the owner of the media. If user is admin, the buttons are shown always. If the user is not logged in, the buttons are not shown at all.
6. Add event listeners to the buttons. Something like this:

   ```jsx
   <button
     className="your tailwind classes here"
     onClick={() => console.log("modify/delete", item)}
   >
   ```

7. Test that the buttons are shown only when the user is logged in and that the event listeners work.
8. Add functions for deleting and modifying media items to `apiHooks.js`: `deleteMedia` and `modifyMedia`. Use the same URL as in the `MediaAPI` for deleting and modifying media items.
9. For now, you can use `useNavigate` hook to refresh the page after deleting or modifying the media item.

## Lab assignment 3

1. Continue in the same branch.
2. Now we add likes to the media items. The user can like a media item only once.
3. Create a new component `Likes.jsx` in the `components` folder.
4. Add a button to the `Likes` component. The button can have just text or a heart icon. You can decide. It also needs to show the number of likes.
5. Add new hook `useLike` to `apiHooks.js`. The hook should have functions `postLike`, `deleteLike`, `getLikeCountByMediaId` and `getLikeByUser`. Use the `MediaAPI`'s [likes endpoints](https://media2.edu.metropolia.fi/media-api/#api-Like) for required functionality.
6. Create states for `likeCount` and `userLike` in the `Likes` component. These are used to store all the likes of the media item and whether the user has liked the media item.
7. Use `useEffect` to get the likes of the media item when the component is mounted.
8. Add event listener to the button. If the user has liked the media item, the button should show that the user has liked the media item. If the user hasn't liked the media item, the button should show that the user can like the media item.
9. Add a function to the button that posts a like to the media item if the user hasn't liked the media item. If the user has liked the media item, the function should delete the like.
10. Add the `Likes` component to the `SingleView` component. The button should be active only when the user is logged in. The number of likes should be shown always.

## Submit

1. Run `npm build` or `npm run build`
2. Move build folder to your public_html
3. Test your app: `http://users.metropolia.fi/~username/tailwind`
4. Modify README.md. Change the link in `Open [X](X) to view it in the browser.` to point to the above link.
5. git add, commit & push to remote repository
6. Submit the link to correct branch of your repository to Oma

---

## Repo
- `https://github.com/Anzuniks/wsk-react`
