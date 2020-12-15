function promiseNoData(loading, data, err) {
  return (
    (err && (
      <p>
        Error: {JSON.stringify(err)} Data: {data}
      </p>
    )) ||
    (loading && (
      <div className="container d-flex h-100 justify-content-center mt-5">
        <div
          className="spinner-grow text-muted "
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-primary"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-success"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-info"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-warning"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-danger"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-secondary"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-dark"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <div
          className="spinner-grow text-light"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ))
  );
}

export default promiseNoData;
// <img src={Spinner} alt="spinner" className="centering" />;
