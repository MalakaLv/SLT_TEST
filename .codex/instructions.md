# CSS and UI Rules

1. box-sizing: border-box on all elements always
2. For adjacent bordered elements that need shared border - 
   use margin-left: -1px to overlap borders at connection point
3. For adjacent bordered elements with divider - 
   use a shared divider element instead of two separate borders
4. To avoid layout shifts on hover - declare all 4 borders 
   in default state with transparent color, change color on hover
5. Use outline or box-shadow for focus states, not border changes
6. Always test that hover/focus states do not cause content shift
7. Match Figma specs exactly - read dimensions, colors, spacing from MCP
8. Use CSS variables for all colors from design tokens
9. Keep specificity low - avoid !important unless overriding third-party
