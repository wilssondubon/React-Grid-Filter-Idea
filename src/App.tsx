import {
  TableField,
  SortContext,
  ISortContext,
  TableInputSearch,
  TableSelectSearch
} from "./Components";
import { UseTable } from "./Hooks";
import "./App.css";

interface User {
  Usuario: String;
  Departamento: String;
  Activo: Boolean;
}

const lista: Array<User> = [
  { Usuario: "WDubon", Departamento: "Sistemas", Activo: true },
  { Usuario: "JGonzalez", Departamento: "Ventas", Activo: false },
  { Usuario: "MEstrada", Departamento: "Ventas", Activo: true },
  { Usuario: "WFernandez", Departamento: "Ventas", Activo: true }
];

function App() {
  const ATable = UseTable([], lista);
  const { Filter } = ATable;

  const Header = () => {
    const SortContextValue: ISortContext = { Sort: ATable.Sort };

    return (
      <SortContext.Provider value={SortContextValue}>
        <thead>
          <tr>
            <TableField DataField="Usuario" Header="Usuario" />
            <TableField DataField="Departamento" Header="Departamento" />
            <TableField
              DataField="Activo"
              DataFieldType="bool"
              Header="Activo"
            />
          </tr>
        </thead>
      </SortContext.Provider>
    );
  };

  const DataSearch = () => {
    return (
      <>
        <TableInputSearch
          Filter={Filter}
          DataField="Usuario"
          className="rounded-input"
        />
        <TableInputSearch
          Filter={Filter}
          DataField="Departamento"
          className="rounded-input"
        />
        <TableSelectSearch
          Filter={Filter}
          DataField="Activo"
          className="rounded-select"
          title=""
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </TableSelectSearch>
      </>
    );
  };

  const AItem = (item: User) => {
    return (
      <tr key={"row-" + item.Usuario}>
        <td>
          <span>{item.Usuario}</span>
        </td>
        <td>
          <span>{item.Departamento}</span>
        </td>
        <td>{item.Activo ? <span>Activo</span> : <span>Inactivo</span>}</td>
      </tr>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <table className="styled-table">
          {Header()}
          <tbody>
            <tr>{DataSearch()}</tr>
            {ATable.Items.map((item) => AItem(item))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
