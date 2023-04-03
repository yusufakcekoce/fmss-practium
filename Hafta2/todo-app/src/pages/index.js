import { useState } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All"); // filtreleme işlemleri sırasında tıklanılan butonun seçili olması için kullanılacak state.

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // form submit edildiğinde çalışacak fonksiyon.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Boş değer girilirse, hiçbir işlem yapılmaz.
    if (!inputValue) return;
    // Yeni todo öğesi, todos state'inin sonuna eklenir.
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  // bir todo öğesi tamamlandığında çalışacak fonksiyon.
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          // Seçilen todo öğesi tamamlanmış olarak işaretlenir veya işareti kaldırılır.
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  // bir todo öğesi silindiğinde çalışacak fonksiyon.
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // filtreleme işlemlerinde kullanılacak fonksiyonlar.
  const showAll = () => {
    setSelectedFilter("All");
  };

  const showActive = () => {
    setSelectedFilter("Active");
  };

  const showCompleted = () => {
    setSelectedFilter("Completed");
  };

  const filteredTodos =
    selectedFilter === "Active"
      ? todos.filter((todo) => !todo.completed)
      : selectedFilter === "Completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  // tamamlanmış tüm todo öğelerinin temizlenmesinde kullanılacak fonksiyon.
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // tamamlanmış todo öğelerinin sayısını hesaplayan fonksiyon.
  const completedCount = todos.filter((todo) => todo.completed).length;
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            checked={todos.length > 0 && completedCount === todos.length}
            onChange={() => {
              const areAllTodosCompleted =
                todos.length > 0 && completedCount === todos.length;
              setTodos(
                todos.map((todo) => ({
                  ...todo,
                  completed: !areAllTodosCompleted,
                }))
              );
            }}
          />
          <label htmlFor="toggle-all"> Mark all as complete </label>

          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={todo.completed ? "completed" : ""}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <label>{todo.text}</label>
                  <button
                    className="destroy"
                    onClick={() => handleDeleteTodo(todo.id)}
                  ></button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.length - completedCount} </strong>
            items left
          </span>

          <ul className="filters">
            <li>
              {/* tıklanan butonun seçili olması için className prop'una "selected" değeri verilir. */}
              <a
                className={selectedFilter === "All" ? "selected" : ""}
                onClick={showAll}
              >
                All
              </a>
            </li>
            <li>
              <a
                className={selectedFilter === "Active" ? "selected" : ""}
                onClick={showActive}
              >
                Active
              </a>
            </li>
            <li>
              <a
                className={selectedFilter === "Completed" ? "selected" : ""}
                onClick={showCompleted}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
    </>
  );
}

export default Home;
