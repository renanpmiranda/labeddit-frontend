export const goToFeedPage = (navigate) => {
    navigate("/feed")
}

export const goToSignUpPage = (navigate) => {
    navigate("/signup")
}

export const goToLoginPage = (navigate) => {
    navigate("/")
}

export const goToDetailsPage = (navigate, postId) => {
    navigate(`/recipe/${postId}`)
}