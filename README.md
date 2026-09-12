# G6 Real Estate - ReadMe (Group 06)

---

## 1. Group Information & Contributions
* **Task**: KIT502 Web Development - Assignment 1
* **Project Name**: G6 Real Estate (Front-End Prototype & Database Design)
* **Folder Location on Usermin Server**: `/groupwork/kit502-group-06/`
* **URL**: `https://ictteach-www.its.utas.edu.au/groupwork/kit502-group-06/Group6_Assignment1/src/home.html`

Here is how our group divided the work for this assignment:

* **Nguyen, Phu Duc (Leader)**: Managed the project timeline, integrated the code, resolved stylesheet merge conflicts, and compiled the documentation. Code-wise, developed the site navigation, wrote this README file, and designed the Database Schema/ER Diagram.
* **Kim, Youngseok**: Designed the Landing Page, the Sign Up page, and the Log In page. Set up the baseline CSS styling.
* **Seam, Abu Mohammed Asem**: Built the Property Listing Page, the Property Details Page, and the `properties.json` data schema.
* **Farzana, Methila**: Designed the About Page and the Contact Page.

---

## 2. Assignment Progress Plan & Timeline
Our team followed a structured schedule to ensure proper integration and testing:

* **25/07/2026** (Task Division): Held a group meeting to discuss the assignment brief and divide the pages based on everyone's strengths. Set up the development timeline and folder structure.
* **26/07/2026 to 31/07/2026** (Individual Coding): Each member wrote the HTML and CSS for their assigned sections.
* **01/08/2026** (Component Delivery): All individual code files and assets were collected for integration.
* **02/08/2026 to 04/08/2026** (Integration & Bug Fixing): Merged the pages, resolved stylesheet conflicts, synchronized navigation layouts, and resolved validation bugs.
* **05/08/2026** (Submission): Uploaded the final integrated folder (`Group6_Assignment1`) to Usermin server.

---

## 3. Design Inspiration & Resources
* **UI/UX Design**: We referenced the layout style of `flatmates.com.au` to design clean property listing grids and functional search filter panels.
* **Fonts**: We chose the system font `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` in CSS. This keeps the page loading instant and consistent across different browsers.
* **Images**: House photos and backgrounds were sourced from Google.
* **ER Diagram Design**: Designed the database schema using `Draw.io`.

---

## 4. Database Choice for Assignment 2
Our team has decided to use **MySQL** as our backend database for the next assignment.
Since our app requires different user roles (Guest, Buyer, Seller, Admin) making transactions at the same time, MySQL is much more robust for handling concurrent connections. 

---

## 5. Requirements Checklist
We went through each page to make sure they match the assignment PDF requirements:

### Site Navigation
* [x] **Appear consistently across every page**: Unified header markup is identical across all 7 pages.
* [x] **Contain links to all pages**: Links to Listing, Detail, About, Contact, Login, and Signup are fully working.
* [x] **Indicate the active page**: JavaScript checks the current path and highlights the active menu link.
* [x] **Include hover/focus effects**: Menu links change color smoothly when hovered.
* [x] **Remain fixed (sticky navigation)**: Navigation bar stays pinned to the top of the screen when scrolling.
* [x] **Collapse appropriately on mobile devices**: Hamburger button toggle slides the menu down on mobile viewports.

### Landing Page (`home.html`)
* [x] **Hero banner**: Large cover block showcasing our brand and background.
* [x] **Featured properties**: Displaying 6 hardcoded property cards in a clean layout.
* [x] **Property search section**: Restored the search dropdown (All Listings, For Sale, For Rent) and input. We also connected it to the listings page filter via JavaScript.
* [x] **Testimonials**: Includes 2 quote blocks from clients.
* [x] **Company highlights**: Key statistics showcasing our achievements.
* [x] **Footer**: Displays address, email, and sitemap link.

### Registration Page (`signup.html`)
* [x] **Required form fields**: Includes role (Buyer/Seller), Name (Given, Middle, Surname), Email, Phone Number, Password, and Confirm Password.
  * [x] **JavaScript field validation**:
    * [x] Prevents submission if fields are empty (Middle Name is correctly skipped as optional).
    * [x] Checks if phone number starts with +61, (+61), or 0.
    * [x] Checks for valid email formatting.
    * [x] Checks if password and confirm password match.
    * [x] Checks if password has at least 7 characters, 1 uppercase, 1 lowercase, and 1 special symbol.
* [x] **Reset button**: Clears all input fields immediately.
* [x] **Redirection**: Redirects back to `home.html` on successful signup.

### Login Page (`login.html`)
* [x] **Required fields**: Form has label and input tags for Email, Password, and a Login button.
* [x] **JavaScript validation**: Blocks submission if email or password are left empty.
* [x] **Redirection**: Redirects back to `home.html` on login success.

### Property Listing Page (`property-listing.html`)
* [x] **Grid Layout**: Displays 6 properties dynamically loaded from `properties.json` in a responsive grid.
* [x] **Search box**: Filters properties by location/title keywords.
* [x] **Filter Panel**: Dropdown filters for property type (House/Apartment/Townhouse), bedrooms (1, 2, 3+), and status (For Sale/Rent).
* [x] **Sorting**: Sorts properties by price and bedroom numbers.
* [x] **Detail Link**: "View Details" button passes the ID parameter to `property-detail.html`.

### Property Details Page (`property-detail.html`)
* [x] **Image gallery**: Large main image with small preview thumbnails below. Clicking a thumbnail swaps the active image.
* [x] **Property description**: Narrative text details.
* [x] **Property specifications**: Displays Price, Type, Bedrooms, Bathrooms, Size, and Parking.
* [x] **Seller's information**: Contact card showing the agent's name, phone, and email.

### About Page (`about.html`)
* [x] **Company overview**: Text descriptions explaining our company history, formatted with justify alignment.
* [x] **Team members**: Displays initials-based circular avatars for our team members.
* [x] **Mission and visions**: Outlines our core mission and vision statements.

### Contact Page (`contact.html`)
* [x] **Contact form**: Input fields for Name, Email, and Message.
* [x] **Company contact info**: Displays office address, phone, email, and business hours.

---

## 6. Development Challenges & Solutions
During the integration phase, our team encountered several technical challenges and successfully resolved them:

1. **Image Alignment and Mismatch**:
   * *Challenge*: Different members referenced the same hero image file in different ways or with mismatched file names, leading to broken backgrounds (a flat gray area) during the merge.
   * *Resolution*: We resolved this by choosing one consistent, high-quality image, unifying the file name across all pages, and verifying that it loads correctly.
2. **Mismatched Headers/Footers**:
   * *Challenge*: Since team members coded pages separately, the headers had different sizes, different logo text, and links did not highlight.
   * *Resolution*: We unified them into a standard responsive `90px` height header with consistent brand logo text, and wrote a JavaScript active-link selector.
3. **JSON Loading Issue**:
   * *Challenge*: The listings page had properties statically hardcoded in the HTML, and we needed to read the property details dynamically from our data file.
   * *Resolution*: We studied how to read local files in JavaScript from W3Schools tutorials and wrote pure client-side JavaScript code with the standard browser `fetch()` function to load and render properties dynamically from `properties.json`.
4. **Registration Validation Conflict**:
   * *Challenge*: The HTML form marked the Middle Name as optional, but JavaScript blocked form submission if it was empty.
   * *Resolution*: We updated the JS conditional check to skip validating the Middle Name field.
5. **Interactive Landing Page Search Bar**:
   * *Challenge*: The landing page search bar (home.html) was static and did not work.
   * *Resolution*: We wrote a JavaScript redirect listener on the home search button. When clicked, it passes the search query and status to the listings page via URL search parameters, which then automatically filters the list.
