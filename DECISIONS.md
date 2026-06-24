# Decisions

## Architectural Decision

One of the key architectural decisions in this project was choosing how to manage global cart state.

The primary options were React Context API and Redux Toolkit. Redux Toolkit is a robust state management solution that excels in larger applications with complex data flows, extensive business logic, and multiple shared state domains. However, after evaluating the requirements of this assignment, I determined that the application's global state requirements were limited mainly to cart management, item quantities, and persistence.

For this reason, I chose React Context API. It provides a lightweight and dependency-free solution while keeping the implementation simple and easy to maintain. The cart state is centralized within a dedicated CartContext, allowing components throughout the application to access and update cart data without prop drilling. For a project of this size, Context API offers a good balance between scalability, readability, and developer experience while avoiding unnecessary complexity.

Another important decision involved variant selection. The assignment required the selected colour and size to be reflected in the URL so that product pages could be deep-linked. Instead of storing variant information solely in component state, I synchronized the selected options with URL query parameters. This approach allows users to refresh the page, bookmark a specific product configuration, or share a link while preserving the selected variant state.

A further challenge was the lack of product variants and inventory information in the Fake Store API. To support the required available, low-stock, and sold-out states, I introduced a lightweight local variant configuration layer. This allowed the UI to behave like a real ecommerce application while keeping the implementation flexible enough to support a future backend inventory service.

## What I Would Improve With More Time

Given additional time, the first improvement would be automated testing. I would add unit tests covering variant selection, quantity updates, sold-out behaviour, and cart interactions to improve reliability and reduce the risk of regressions.

I would also improve accessibility by implementing enhanced keyboard navigation, focus management, semantic markup, and ARIA attributes to provide a better experience for assistive technology users.

For data fetching, I would consider introducing React Query to improve request caching, background refetching, loading state management, and error handling. This would become increasingly valuable as the application grows.

Finally, I would implement a mock asynchronous Add to Cart workflow with loading and failure states, as well as a more realistic inventory model. These additions would better simulate production ecommerce behaviour and provide a richer user experience.

The current implementation prioritizes maintainable architecture, clear separation of concerns, responsive design, and fulfillment of the assignment requirements while keeping the codebase straightforward and easy to extend.
