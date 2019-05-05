if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token)
}