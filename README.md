# react-fj-toolbox
react toolbox


### PromiseView

inject promise value to child component

Example:

```
const ShowId=({name,id})=><div>{name}:{id}</div>;
const getId=axios.get('/id').then(resp=>resp.data);

<PromiseView promise={getId()} then="id">
      <ShowId name="jack"/>
</PromiseView>

```