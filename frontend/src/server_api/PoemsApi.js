async function getPoems(){
    try {
      const response = await axios.get('/poems')
      setPoems(response.data)
    } catch (error) {
      console.log(error)
      return
    }

}
