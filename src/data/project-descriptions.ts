// Project write-ups, in the client's own words. Keyed by project slug
// (matches src/data/projects.generated.json). Shown as a text tile inside
// each project's gallery grid.

export type ProjectDescription = {
  tagline?: string;
  text: string;
};

export const projectDescriptions: Record<string, ProjectDescription> = {
  "bessy-residence": {
    text: "Bessy Residence is a premium contemporary villa designed around light, landscape, and seamless indoor–outdoor living. Lush internal courtyards, expansive glazing, warm timber, natural stone, and tropical greenery create a calm, elegant atmosphere throughout the home. The result is a refined residence that balances luxury, privacy, openness, and a strong connection with nature.",
  },
  "sunil-singhvi-apartment": {
    tagline: "Luxury Duplex Residence · Chennai, Tamil Nadu",
    text: "Sunil Singhvi Apartment is a luxury duplex residence in Chennai, envisioned as a seamless balance of expansive living, privacy, natural light and indoor greenery. The planning was explored through two distinct layout options — one organised around a sculptural curved staircase, open terrace and a series of formal and informal living spaces, while the alternate scheme introduces a more linear staircase configuration with larger interconnected volumes and dramatic double-height spaces. Both options carefully integrate private bedroom suites, walk-in wardrobes, balconies, dining, kitchen and service areas across the two levels.",
  },
  "mint-restaurant-mahabalipuram": {
    tagline: "Mahabalipuram, ECR, Chennai",
    text: "MINT Restaurant is envisioned as a contemporary dining destination along Chennai's scenic ECR corridor, combining expressive architecture with a warm, nature-driven dining experience. The planning places primary vehicular parking within a semi-basement, allowing the ground level to remain focused on arrival, landscape and pedestrian movement. The ground floor is organized around a landscaped central atrium, with reception and dining spaces arranged around it, while the kitchen and service areas are efficiently consolidated along one side. The upper dining level continues this relationship with the atrium, creating visual connectivity, natural light and greenery throughout the restaurant. A sculptural flowing façade, perforated screens, earthy terracotta tones and layered warm lighting give MINT a distinctive identity inspired by movement, craft and the coastal character of ECR.",
  },
  "iifl-rooftop-restaurant": {
    tagline: "Chennai",
    text: "IIFL Rooftop Restaurant is conceived as a large-scale terrace dining destination atop a high-rise tower in Chennai, combining an expansive food-court experience with landscaped outdoor spaces and panoramic city views. The planning is organized around a spacious central cafeteria accommodating approximately 750 seats, supported by multiple food stalls, dedicated service corridors, washrooms and efficient back-of-house access. A clearly defined arrival sequence from the lift lobby leads through reception, waiting and meeting zones into the main dining hall, while boardroom, training and administrative spaces are integrated along the quieter edge of the floor. The terrace extends into a landscaped roof garden with outdoor dining, shaded seating and smoking zones, creating a seamless transition between indoor hospitality and open-air rooftop experience. Warm timber, lush greenery, layered lighting and contemporary detailing give the restaurant a relaxed, yet premium character suited to Chennai's urban skyline.",
  },
  "pushkar-apartments": {
    text: "Pushkar Apartments is a contemporary residential development for which I worked on the exterior 3D visualization and architectural presentation. The visualizations were developed to communicate the project's façade composition, material palette, landscaped courtyards and overall residential ambience with a high level of realism. Particular attention was given to natural and golden-hour lighting, glazing and material reflections, greenery, streetscape context and carefully framed architectural views. The series also highlights the project's lifestyle spaces — including landscaped gardens, recreational courts, swimming pool and common amenities — creating a cohesive visual narrative of the development from street-level perspectives to aerial views.",
  },
  "malkoha-residence": {
    text: "Malkoha Residence Interiors is an interior 3D visualisation project focused on creating a calm, elegant, and welcoming residential experience. The design motive was to blend comfort with refined aesthetics, resulting in a space that feels warm, serene, and deeply livable. Styled in an organic contemporary language with subtle bohemian and tropical influences, the interiors feature earthy tones, natural textures, soft curves, wooden elements, woven details, and sculptural lighting. The overall theme celebrates a seamless balance between sophistication and nature-inspired living.",
  },
  vaf: {
    tagline: "Administrative Headquarters",
    text: "Designed as the corporate face for a high-precision missile manufacturing unit, the VAF Admin Zone balances industrial security with modern architectural sophistication. The project scope centered on administrative zone planning, comprehensive 3D modeling, and realistic visualization. The design introduces a dual-block massing articulated by vertical louvers, expansive curtain walls, and an elevated terrace garden that softens the industrial edge. At ground level, sculptural V-shaped composite columns lift the upper floors to accommodate an integrated automated stacking parking system and streamlined vehicular circulation. By merging high-tech aesthetics with functional administrative planning, the facility establishes a bold, technologically driven identity tailored to advanced defense manufacturing.",
  },
  "refex-office": {
    tagline: "Workplace Planning & Interior Design",
    text: "Spanning the 9th and 10th floors, the Refex corporate office balances spatial efficiency with a warm, biophilic-modern aesthetic. The planning clearly separates programmatic needs: the 9th floor hosts an agile 50-seat open workstation area, private perimeter cabins, and collaborative meeting zones, while the 10th floor is dedicated to leadership suites, client reception, executive boardrooms, and an open landscaped terrace. The interior language pairs exposed concrete ceilings and black-framed glazed partitions with warm oak millwork and fluted timber detailing. Organic design touches — including curvilinear LED lights, terracotta acoustic ceiling baffles, and circular planters with integrated seating — soften the industrial backdrop, delivering a cohesive, nature-infused corporate environment built for high performance.",
  },
  "vrx-vijayaraja": {
    tagline: "Architecture, Interiors & Spatial Planning",
    text: "Designed as an experiential sales hub, the VRX Vijayaraja Experience Centre translates an origami-inspired architectural concept into a curated customer journey. The building envelope makes a bold statement with a faceted, geometric stone-finish facade, angular glazing cuts, and dramatic V-column supports over an open glazed ground level. The interior zoning is choreographed across two intuitive floors: the ground level hosts the primary reception, a central scale-model showcase, an AV screening theatre, and back-office workstations; a sculptural helical staircase wrapped within a circular glass-block rotunda ascends to the first floor, which features curved private meeting pods, a hospitality coffee lounge, and a fully furnished 2-BHK mock-up apartment suite with a viewing deck. Inside, faceted origami false ceilings with embedded geometric LED profiles echo the exterior form, while curved glass partitions, warm travertine textures, bronze accents, and lush indoor planters soften the sharp angularity to create an inviting, ultra-modern luxury environment.",
  },
};
