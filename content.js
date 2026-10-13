/*
  Made for Marigold — everything you'll want to change lives in this file.
  Edit the text between the quotes, save, and refresh the page.
*/
window.SITE = {
  // Where order requests go. Change this to the address you actually check.
  email: "hello@madeformarigold.com",

  // Optional: paste a free access key from https://web3forms.com here and the
  // order form will send straight to the inbox above. While it is empty, the
  // form opens the visitor's own email app with the request filled in.
  web3formsKey: "",

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
      price    — e.g. "$45". Leave "" to hide it.
      status   — "Available", "Sold", or "Made to order".
      buyUrl   — optional checkout link (Square, Stripe, Etsy). When set, the piece
                 gets a "Buy this piece" button.
      featured — true makes the tile double size.
  */
  pieces: [
    { title: "Throw quilt", category: "quilts", photo: "", description: "", price: "", status: "Made to order", buyUrl: "", featured: true },
    { title: "Quilted tote bag", category: "totes", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Bible cover", category: "bible-covers", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Makeup bag", category: "makeup-bags", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Baby quilt", category: "quilts", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Market tote", category: "totes", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Zippered makeup bag", category: "makeup-bags", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Bible cover with handle", category: "bible-covers", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" },
    { title: "Lap quilt", category: "quilts", photo: "", description: "", price: "", status: "Made to order", buyUrl: "" }
  ],

  /*
    Craft fairs. Past dates drop off the page on their own. Example entry:
      { date: "2026-11-14", name: "Holiday Makers Market", place: "Community Center, Your Town", note: "Booth 12, 9am to 3pm" },
  */
  fairs: [
  ],

  about: {
    // e.g. "images/me.jpg"
    photo: "",
    paragraphs: [
      "Hi, I'm Brittany. I make quilts and quilted things at my sewing machine: tote bags, Bible covers, makeup bags, and whatever else I can talk a pile of fabric into becoming.",
      "I cut, piece and quilt everything myself, one piece at a time. You can find me at craft fairs through the year, and in between I take custom orders."
    ],
    // The story behind the name. Shown under the paragraphs when filled in.
    nameStory: ""
  }
};
