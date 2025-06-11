<template>
<div class="flex  md:flex-row gap-4 p-4">
<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Participants</th>
        <th>{{ Player1Data[0]?.PlayerNmae }}</th>
        <th>{{ Player2Data[0]?.PlayerNmae }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>Heals Left</th>
        <td>{{ Player1Data[0]?.HealsLeft }}</td>       <!-- p1 -->
        <td>{{ Player2Data[0]?.HealsLeft }}</td>       <!-- p2 -->
      </tr>
      <!-- row 2 -->
      <tr>
        <th>Pot Accuracy</th>
        <td>{{ Player1Data[0]?.PotAccuracy }}</td>
        <td>{{ Player2Data[0]?.PotAccuracy }}</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>Thrown Pots</th>
        <td>{{ Player1Data[0]?.ThrownPots }}</td>
        <td>{{ Player2Data[0]?.ThrownPots }}</td>
      </tr>
       <!-- row 4 -->
       <tr>
        <th>Missed Pots</th>
        <td>{{ Player1Data[0]?.MissedPots }}</td>
        <td>{{ Player2Data[0]?.MissedPots }}</td>
      </tr>
       <!-- row 5 -->
       <tr>
        <th>Stolen Health</th>
        <td>{{ Player1Data[0]?.StolenHealth }}</td>
        <td>{{ Player2Data[0]?.StolenHealth }}</td>
      </tr>
       <!-- row 6 -->
       <tr>
        <th>Total Hits</th>
        <td>{{ Player1Data[0]?.TotalHits }} Hits</td>
        <td>{{ Player2Data[0]?.TotalHits }} Hits</td>
      </tr>
       <!-- row 7 -->
       <tr>
        <th>Critical Hits</th>
        <td>{{ Player1Data[0]?.CriticalHits }} Hits</td>
        <td>{{ Player2Data[0]?.CriticalHits }} Hits</td>
      </tr>
      <!-- row 8 -->
      <tr>
        <th>Average Damage</th>
        <td>{{ Player1Data[0]?.AverageDamage }}❤</td>
        <td>{{ Player2Data[0]?.AverageDamage }}❤</td>
      </tr>
      <!-- row 9 -->
      <tr>
        <th>Longest Combo</th>
        <td>{{ Player1Data[0]?.LongestCombo }}</td>
        <td>{{ Player2Data[0]?.LongestCombo }}</td>
      </tr>
      <!-- row 10 -->
      <tr>
        <th>Ping</th>
        <td>{{ Player1Data[0]?.Ping }}ms</td>
        <td>{{ Player2Data[0]?.Ping }}ms</td>
      </tr>
      <!-- row 11 -->
      <tr>
        <th>Health</th>
        <td>{{ Player1Data[0]?.Health }}❤/20❤</td>
        <td>{{ Player2Data[0]?.Health }}❤/20❤</td>
      </tr>
      <!-- row 12 -->
      <tr>
        <th>ACS</th>
        <td>{{ Player1Data[0]?.ACS }}</td>
        <td>{{ Player2Data[0]?.ACS }}</td>
      </tr>
    </tbody>
  </table>
</div>
<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 items-baseline gap-2">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>{{ Player1Data[0]?.PlayerNmae }}</th>
        <th></th>
        <th>{{ Player2Data[0]?.PlayerNmae }}</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <td>   
        <div class="relative inline-block">
             <img style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" src="@/assets/minecraft/textures/gui/inventory.png">
             <img :src="'https://visage.surgeplay.com/full/128/'+Player1Data[0]?.PlayerUUID"class="absolute left-[60px] top-[29px] rounded"style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;">
        </div>
        </td>
        <td>Inventory</td>
        <td>
            <div class="relative inline-block">
             <img style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;" src="@/assets/minecraft/textures/gui/inventory.png">
             <img :src="'https://visage.surgeplay.com/full/128/'+Player2Data[0]?.PlayerUUID"class="absolute left-[60px] top-[29px] rounded"style=" -webkit-user-drag: none; -moz-user-drag: none; -ms-user-drag: none; -user-drag: none;">
        </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="card card-border bg-base-100">
  <div class="card-body">
    <h2 class="card-title">MatchID: {{ MatchInfo[0]?.MatchID }}</h2>
    <p>Date: {{ MatchInfo[0]?.Data }}</p>
    <p>Duration：{{ MatchInfo[0]?.Duration }}</p>
    <p>Kit Type: {{ MatchInfo[0]?.KitType }}</p>
  </div>
</div>
</div>
</div>
</template>

<script lang="ts" name="FightsView" setup>
import { ref, onMounted } from 'vue'



const MatchInfo = ref([{
        Data: '2023-01-01 00:00:00',
        Duration: '1h 30m',
        KitType: 'Nodebuff',
        MatchID: '123456789asdasdasdw123hihih0',
}])


const Player1Data = ref([
{
        PlayerNmae: 'ItzHoshinoDev_',
        PlayerUUID: '96c6500f4c9c4fd286a5e633862022be',
        IsWin: true,
        HealsLeft: 10,
        PotAccuracy: '76%',
        ThrownPots: 18,
        MissedPots: 5,
        StolenHealth: 0.31,
        TotalHits: 92,
        CriticalHits: 36,
        AverageDamage: 1.01,
        LongestCombo: 5,
        Ping: 36,
        Health: 6,
        ACS: 90
    }
])

const Player2Data = ref([
{
        PlayerNmae: 'Mgs_xiaosaPVP',
        PlayerUUID: '138bc69f995143d58f6fdc071cac864a',
        IsWin: false,
        HealsLeft: 1,
        PotAccuracy: '6%',
        ThrownPots: 8,
        MissedPots: 9,
        StolenHealth: 6,
        TotalHits: 8,
        CriticalHits: 6,
        AverageDamage: 9.01,
        LongestCombo: 1,
        Ping: 96,
        Health: 0,
        ACS: 50
    }
])

</script>