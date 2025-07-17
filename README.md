# Partify-get-car-parts

A responsive web application for finding compatible auto parts by vehicle selection. Built with HTML, CSS, and JavaScript.


## Features

- Dynamic vehicle selection (Year → Make → Model → Part Type)
- Mobile-friendly responsive design
- Featured products showcase
- Direct links to product pages
- Smooth UI animations

## How to Use

1. Select your vehicle year
2. Choose manufacturer
3. Pick your model
4. Select part type
5. Click "Find Parts"

## Technology Stack

- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6)
- Font Awesome icons


## URL Format

Generates links in this pattern:
`https://partifyusa.com/collections/{year}-{make}-{model}?filter.p.product_type={productType}`

## License

Proprietary software © 2025 Partify USA

[Visit Website](https://partifyusa.com)

## Data Structure

The application uses the following data structure:

```javascript
{
  year: "2015",
  make: "RAM",
  model: "1500",
  productType: "Front Bumper"
}


