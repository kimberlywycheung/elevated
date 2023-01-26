# Front-end application for Elevated Clothing Co

## Introduction
This is a front-end e-commerce platform for Elevated Clothing Co. It utlitizes an exteral API that seeds the website with product information. React hooks and styled components were used to render an interactive and responsive platform. The main features of the website include:

## Technology Stack
* React
* Node.js
* StylizedComponents
* Webpack & Babel
* DevServer via Webpack
* React Testing Library
* Jest
* Cypress
* AWS

## Features

### Product Overview

* Dynamically render product selected from the server's API 
* Image gallery carousel with the ability to zoom and expand the photo 
* Styles Selector dynamically lists out styles based on the item 
* Size Selector dynamically fills out based on product 
* Add to cart feature

### Related Products & Favorites

The Related Products section features two carousels that show related products. The following components include the below features & functionality:

*Product Cards:*
* Each product card highlights the product’s default image, category, name, price (and sale price, when applicable), and star ratings.
* Each product card is clickable, and will update the product page when clicked.
* Each card and its corresponding action button (in the top right corner) have hover states so the user has immediate feedback on clickability.

*Related Products Carousel*
* Shows a scrollable list of related products similar related products to the one the user is currently viewing
* Each card has a star icon that indicates whether the product has already been added to the user’s ”Your Outfit” section.
* The user can access a scrollable comparison modal from the product card that allows the user to compare the features of the related product to the currently viewed product. It highlights each product’s feature characteristics if applicable.

*Your Outfits Carousel:*
* Scrollable list of products the user has saved.
* Users can manage their outfit by adding or deleting products from their favorites via the Add to Outfit or delete buttons.
* The Add to Outfit card adds the currently viewed product to the “Your Outfit” list.
* Allows for persistence of list across different sessions, as long as the relevant cookies exist.
* Maintains a saved list of unique products only.

### Q & A

### Ratings & Reviews

## Contributors
Aristotle Jalalianfard - Product Overview
Evan O Shea - Q&A
Kimberly Cheung - Related Products
Ryan Gehris - Ratings & Reviews
