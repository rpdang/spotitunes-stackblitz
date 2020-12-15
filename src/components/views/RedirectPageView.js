import { Redirect } from "react-router-dom";

const RedirectPageView = ({ tokenValues }) => {
    return (
        <div>
            {tokenValues !== null ? (
                <Redirect to="/infopage" />
            ) : (
                <Redirect to="/login" />
            )}
        </div>
    );
};

export default RedirectPageView;
