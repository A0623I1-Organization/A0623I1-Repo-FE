import "./CreateNotification.scss";


export default function CreateNotification(props) {
    return (
        <>
            <div
                className="container"
                style={{
                    height: '80vh',
                    width: '95%'
                }}
            >
                <div className="title">
                    Post an announcement
                </div>
                <form action="">
                    <div className="user-details">
                        <div className="input-box">
        <span className="details">
          Date Submitted
        </span>
                            <input
                                placeholder="Enter your name"
                                type="datetime-local"
                            />
                        </div>
                        <div className="input-box">
        <span className="details">
          Topic{' '}
        </span>
                            <input
                                placeholder="Enter your topic"
                                required
                                type="text"
                            />
                        </div>
                        <div className="input-box">
        <span className="details">
          Content
        </span>
                            <textarea required/>
                        </div>
                        <div className="gender-details">
                            <input
                                id="dot-1"
                                name="gender"
                                required
                                type="radio"
                            />
                            <input
                                id="dot-2"
                                name="gender"
                                required
                                type="radio"
                            />
                            <input
                                id="dot-3"
                                name="gender"
                                required
                                type="radio"
                            />
                            <span className="gender-title">
          Object
        </span>
                            <div className="category">
                                <label htmlFor="dot-1">
                                    <span className="dot one"/>
                                    <span className="gender">
              All
            </span>
                                </label>
                                <label htmlFor="dot-2">
                                    <span className="dot two"/>
                                    <span className="gender">
              Warehouse manager
            </span>
                                </label>
                                <label htmlFor="dot-3">
                                    <span className="dot three"/>
                                    <span className="gender">
              Saler
            </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <input
                            className="send"
                            type="submit"
                            value="Send"
                        />
                        <input
                            className="cancel"
                            defaultValue="Cancel"
                            type="button"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
