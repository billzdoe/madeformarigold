# Made for Marigold

The website for madeformarigold.com. Plain HTML, CSS and JavaScript: no build step, nothing to install. Double-click `index.html` to preview it.

## Changing things

Everything you'll normally edit is in **`content.js`**.

**Add a photo of a piece**

1. Save the photo into the `images` folder (JPG, roughly 1600px on the long side is plenty).
2. In `content.js`, find the piece in `pieces` and set `photo: "images/your-file.jpg"`.
3. Add a new piece by copying one of the lines and changing the text.

Other fields on a piece: `description`, `price` (e.g. `"$45"`; shows "Price coming soon" while empty), `status` (`"Available"` or `"Sold"`), `buyUrl` (a Square, Stripe or Etsy checkout link, which adds a "Buy this piece" button; without one, buyers send a message), and `featured: true` for a double-size tile.

**Add a craft fair**: add a line to `fairs` (there is an example in the file). Past dates disappear on their own.

**About me**: edit `about.paragraphs`, set `about.photo`, and fill in `about.nameStory` with the story behind the name.

**Email and social links**: `email` and `social` at the top of the file.

## The contact form

Until `web3formsKey` is filled in, the form opens the visitor's email app with their message written out. For messages that send straight from the page, create a free access key at web3forms.com using the inbox that should receive them, and paste it into `web3formsKey`.

## Putting it online

Any static host works (Netlify, Cloudflare Pages, GitHub Pages, Render). Upload this folder as-is, then point madeformarigold.com at the host from the domain registrar's DNS settings.
