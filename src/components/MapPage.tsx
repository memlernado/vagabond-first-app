import { MapContainer, GeoJSON } from "react-leaflet";
import styled, { useTheme } from "styled-components";
import { NAV_HEIGHT } from "./Header";
import type { FeatureCollection, Geometry, Feature } from "geojson";
import data from "assets/countries.json";
import { useAppSelector } from "store";
import { scaleLinear } from "d3-scale";
import { useCallback, useMemo } from "react";

const Map = styled(MapContainer)`
  height: calc(100vh - ${NAV_HEIGHT});
  background-color: ${({ theme }) => theme.pageBackgroundColor};
`;

type CountryProperties = { id: string; NAME_EN: string; ISO_A2: string };
type CountryFeature = Feature<Geometry, CountryProperties> | undefined;
const countries = data as FeatureCollection<Geometry, CountryProperties>;

const MapPage: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const theme = useTheme();
  const stats = useMemo(() => {
    const data: Record<string, number> = {};
    todos.forEach((c) => {
      data[c.countryCode] =
        data[c.countryCode] !== undefined ? data[c.countryCode] + 1 : 1;
    });
    return data;
  }, [todos]);

  const colorScale = useCallback(
    (numberOfTodos: number) => {
      const max = Math.max(...Object.values(stats));
      const avg =
        Object.values(stats).reduce((acc, curr) => acc + curr, 0) /
        Object.values(stats).length;

      const inner = scaleLinear<string>()
        .domain([0, avg, max])
        .range(["#ffffff", "#ffc568", "#fca311"]);

      return inner(numberOfTodos);
    },
    [stats]
  );

  return (
    <Map
      center={[23.505, -31.09]}
      zoom={3}
      minZoom={3}
      maxZoom={7}
      maxBounds={[
        [85, -180],
        [-85, 180],
      ]}
      key={theme.id}
    >
      <GeoJSON
        data={countries}
        style={(f: CountryFeature) => {
          const code = f?.properties?.ISO_A2;
          const fillColor = code ? colorScale(stats[code] ?? 0) : "#fff";
          return {
            fillColor,
            fillOpacity: 1,
            color: "black",
          };
        }}
      />
    </Map>
  );
};

export default MapPage;
