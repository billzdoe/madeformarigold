/*
  Made for Marigold — everything you'll want to change lives in this file.
  Edit the text between the quotes, save, and refresh the page.
*/
window.SITE = {
  // Where messages from the site go. Change this to the address you actually check.
  email: "madeformarigold@gmail.com",

  // Optional: paste a free access key from https://web3forms.com here and the
  // contact form will send straight to the inbox above. While it is empty, the
  // form opens the visitor's own email app with the request filled in.
  web3formsKey: "b5c9f8df-f301-42eb-ad65-381a26879066",

  // Full links, e.g. "https://www.instagram.com/yourname". Empty ones are hidden.
  social: {
    instagram: "",
    facebook: "",
    etsy: ""
  },

  categories: [
    { id: "quilts", label: "Quilts" },
    { id: "totes", label: "Tote bags" },
    { id: "bible-covers", label: "Bible covers" },
    { id: "makeup-bags", label: "Makeup bags" }
  ],

  /*
    The gallery. One entry per piece.
      photo    — put the picture in the "images" folder and write "images/your-file.jpg".
                 Leave "" and a quilt-block pattern shows instead.
      price    — e.g. "$45". While it is "" the piece shows "Price coming soon".
      status   — "Available" or "Sold". Sold pieces get a Sold tag.
      buyUrl   — optional checkout link (Square, Stripe, Etsy). When set, the piece
                 gets a "Buy this piece" button. Without one, buyers send a message.
      featured — true makes the tile double size.
  */
  pieces: [
    { title: "Throw quilt", category: "quilts", photo: "", description: "", price: "", status: "Available", buyUrl: "", featured: true },
    { title: "Quilted tote bag", category: "totes", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Bible cover", category: "bible-covers", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Makeup bag", category: "makeup-bags", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Baby quilt", category: "quilts", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Market tote", category: "totes", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Zippered makeup bag", category: "makeup-bags", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Bible cover with handle", category: "bible-covers", photo: "", description: "", price: "", status: "Available", buyUrl: "" },
    { title: "Lap quilt", category: "quilts", photo: "", description: "", price: "", status: "Available", buyUrl: "" }
  ],

  /*
    Craft fairs. Past dates drop off the page on their own. Example entry:
      { date: "2026-11-14", name: "Holiday Makers Market", place: "Community Center, Your Town", note: "Booth 12, 9am to 3pm", url: "https://the-fair-website.com" },
    The url is optional; it turns the fair name into a link.
  */
  fairs: [
    { date: "2026-11-14", name: "Celebration of Lights", place: "Downtown Shelbyville, Kentucky", note: "3pm to 8pm", url: "https://www.shelbymainstreet.com/celebrationoflights" },
    { date: "2026-11-21", name: "Once Upon a Christmas Gift Show", place: "Shelbyville Conference & Visitors Center, 219 7th Street, Shelbyville, Kentucky", note: "10am to 3pm", url: "https://www.eventeny.com/events/christmasgift-31326/" }
  ],

  about: {
    // e.g. "images/me.jpg"
    photo: "",
    paragraphs: [
      "Hello new friend! My name is Brittany and Made for Marigold is a product of a simple desire to make a baby quilt.",
      "Early summer of 2023, with only the experience of turning on a sewing machine and making simple curtains, I endeavored to make a quilt for my soon expected baby. In just a few weeks I would find out the gender but picked out fabrics for a girl quilt with the hope I'd get to use them.",
      "Although we did find out our sweet baby was a girl, we also found out she had a neural tube disorder called anencephaly and would not survive. As devastating as this was, I did not give up on my hope to make that quilt.",
      "I had a dream of friends and family joining in making the quilt as we prayed for our Amelia Marie. This was the beginning - a prayer quilt. Each person would hand sew a simple quilt block together and pray for my Amelia, and I would put them all together into a large quilt. This quilt came to the hospital with me and wrapped me in comfort in the weeks of grieving that followed.",
      "From there, I was hooked. Making prayer quilts for others experiencing difficult circumstances. And then gifting all kinds of creations to show my love for friends and family.",
      "And here we are. Made for Marigold. Creating things to bring others comfort and joy in honor of my beautiful daughter.",
      "I'm glad you're here! Enjoy something for yourself, or gift to another. Everything is made with a ton of love (and a little creative frustration haha)."
    ],
    // The story behind the name. Shown under the paragraphs when filled in.
    nameStory: ""
  }
};
