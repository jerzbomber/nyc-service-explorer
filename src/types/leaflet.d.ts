// src/leaflet.d.ts
import "leaflet";

// Extend Leaflet's Icon.Default type to include _getIconUrl
declare module "leaflet" {
  namespace Icon {
    interface Default {
      _getIconUrl?: () => string;
    }
  }
}
