import React, { Component } from 'react'
import config from '../../config'
import Button from '../../components/Button/Button';
import TokenService from '../../services/token-service'
import WordsList from '../../components/WordsList/WordsList'

class DashboardRoute extends Component {
  state = {
    error: null,
    words: [],
    language: {},
  }

  componentDidMount = () => {
    this.fetchWords()
      .then(obj => {
        console.log(obj)
        this.setState({
          words: obj.words,
          language: obj.language
        })
        console.log(this.state.language)
      })
  }

  fetchWords = () => {
    return (
      fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json()
      }
        return Promise.reject('Error fetching language and words from server');
      })
      .catch(err => {
        this.setState({error: err})
      })
    )
  }

  render() {
    return (
      <section>
        <h2>Ready to Learn {this.state.language.name}?</h2>
        <WordsList words={this.state.words}/>
        <Button type='button'>START PRACTICING</Button>
      </section>
    );
  }
}

export default DashboardRoute
