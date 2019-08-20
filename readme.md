# Project: Odyssey

The goal of Odyssey is to serve as a flexible digital journal. It should be able to serve as an excellent note-taking application, a project management application, a blog, and a content management platform. It should be extensively customizable in many ways and lend itself to many uses. Working with Odyssey should feel intuitive, personal, and empowering.

The Odyssey project has several deliverables:
  - *core* - A set of extensible, modular data types to underpin the application
  - *components* - A set of Vue components that consume and visualize the data types
  - *app* - A Vue UI for the journal itself
  - *server* - A Feathers server for storing the data (using Kadabra for MVP)

## Roadmap to MVP:

The goal of MVP is that Odyssey can serve as its own project management application.

### Core
Page, View, Representation, Part - UI Types

Archetype, Feature, Field, Notion, Tags, Entity - Data Types

- Define these types
- Create validators via AJV
- Schemas vs instances
- Jest 100% Code Coverage
- Default/Standard Archetypes
  - Folder (Basic Container)
  - Document (Basic Text Note w/ Tags)

### Components
- Storybook
- JSON Representation
- File Representation
  - FileIconPart
  - FileTextPart
- Card Representation
  - CardTitlePart
  - CardTypePart
  - CardBodyPart
- Row Representation
  - Cell Part
- Form Representation
  - Fields
  
### Application
- Nav for containers and notes
- Single-Note Views:
  - Card
  - Table
  - Form
