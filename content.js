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
      "Hi, I'm Brittany. I make quilts and quilted things at my sewing machine: tote bags, Bible covers, makeup bags, and whatever else I can talk a pile of fabric into becoming.",
      "I cut, piece and quilt everything myself, one piece at a time. You can find me at craft fairs through the year, and in between I take custom orders."
    ],
    // The story behind the name. Shown under the paragraphs when filled in.
    nameStory: ""
  }
};
