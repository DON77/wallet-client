const serverUrl = 'http://localhost:4000/v1/wallets';

export const saveBudget = data => {
  return new Promise((resolve, reject) =>
    fetch(`${serverUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON))
      .catch(error => reject(error))
  );
};

export const getBudget = username => {
  return new Promise((resolve, reject) =>
    fetch(`${serverUrl}/${username}`)
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON))
      .catch(error => reject(error))
  );
};

export const updateFlows = (username, data) => {
  return new Promise((resolve, reject) =>
    fetch(`${serverUrl}/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON))
      .catch(error => reject(error))
  );
};

export const removeFlow = (username, index) => {
  return new Promise((resolve, reject) =>
    fetch(`${serverUrl}/${username}/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON))
      .catch(error => reject(error))
  );
};
