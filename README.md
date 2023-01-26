# Elevated Clothing Co

## Introduction
This is a front-end e-commerce platform for Elevated Clothing Co. It utlitizes an exteral API that seeds the website with product information. React hooks and styled components were used to render an interactive and responsive platform.


## Related Products & Favorites Module

<img width="1176" alt="Screen Shot 2023-01-26 at 12 31 46 PM" src="https://user-images.githubusercontent.com/37416800/214944304-b9c1dbbb-2bc1-42de-9da5-c6203b278d12.png">
<img width="1178" alt="Screen Shot 2023-01-26 at 12 31 55 PM" src="https://user-images.githubusercontent.com/37416800/214944326-2d9212b9-a7f0-42f0-ac69-e0e81144c1b0.png">
<details>
    <summary>See Comparison Details</summary>

<img width="1175" alt="Screen Shot 2023-01-26 at 12 31 37 PM" src="https://user-images.githubusercontent.com/37416800/214944462-12f487f5-02ec-42d1-ba91-323d7eda2627.png">

</details>


The Related Products section features two carousels that show related products. The following components include the below features & functionality:

### Product Cards:
* Each product card highlights the product’s default image, category, name, price (and sale price, when applicable), and star ratings.
* Each product card is clickable, and will update the product page when clicked.
* Each card and its corresponding action button (in the top right corner) have hover states so the user has immediate feedback on clickability.

### Related Products Carousel:
* Shows a scrollable list of related products similar related products to the one the user is currently viewing
* Each card has a star icon that indicates whether the product has already been added to the user’s ”Your Outfit” section.
* The user can access a scrollable comparison modal from the product card that allows the user to compare the features of the related product to the currently viewed product. It highlights each product’s feature characteristics if applicable.

### Your Outfits Carousel:
* Scrollable list of products the user has saved.
* Users can manage their outfit by adding or deleting products from their favorites via the Add to Outfit or delete buttons.
* The Add to Outfit card adds the currently viewed product to the “Your Outfit” list.
* Allows for persistence of list across different sessions, as long as the relevant cookies exist.
* Maintains a saved list of unique products only.


## Technology Stack
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
