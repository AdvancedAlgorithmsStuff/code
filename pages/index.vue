<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>Week 2</td>
          <td>
            <ul>
              <li><nuxt-link to="/algorithms/DivideAndConquer">Divide and Conquer</nuxt-link></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Week 4</td>
          <td>
            <ul>
              <li><nuxt-link to="/algorithms/Dijkstra">Dijkstra</nuxt-link></li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Week 5</td>
          <td>
            <ul>
              <li><nuxt-link to="/algorithms/Knapsack">Knapsack</nuxt-link></li>
              <li><nuxt-link to="/algorithms/SequenceAlignment">Sequence Alignment</nuxt-link></li>
            </ul>
          </td>
        </tr>
      <tr>
        <td>Week 7</td>
        <td>
          <ul>
            <li><nuxt-link to="/algorithms/NetworkFlow">Network Flow</nuxt-link></li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style lang="scss" scoped>
table td, table tr {
  border: 1px solid black;
}

a {
  @apply text-blue-500;

  &:hover {
    @apply underline;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
