
<template>
  <div>
      <div v-if="loading">
        <i class="fa fa-spinner fa-pulse fa-2x"></i>
        <br>Loading Navigation..
      </div>
      <TableData v-else 
        title="Manage Navigation" 
        dataKey="NAVI_ID" 
        :data="data" 
        :header="header"
        :renderColumn="renderColumn"
        :validRow="validRow"
        :arrangeData="arrangeData"
        :editRow="editRow"
        :deleteRow="deleteRow"></TableData>
  </div>
</template>

<script>
import { loadNaviFromDB } from "../helper/navi-helper";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ManageNavi",
  data() {
    return {
      loading: true,
      data: null,
      header: ["#", "#", "ID", "Label", "Url", "Version", "Name", "Parent Name"]
    };
  },
  created() {
    this.init();
  },
  // computed: {
  //   ...mapGetters({
  //     popupState: "popupState"
  //   })
  // },
  methods: {
    ...mapMutations(["openPopup"]),
    init() {
      var version = new Date().getTime();
      loadNaviFromDB(
        res => {
          //console.log("res", res);
          this.data = res.data;
          this.loading = false;
        },
        err => {
          console.log("err", err);
        },
        version
      );
    },
    getFixSize(d) {
      return `<div style='width:150px'>${d}</div>`;
    },
    /// ###########################################################
    // functions for Table Data
    editRow(d) {
      this.openPopup({
        title: `Edit Navigation ${d.NAVI_LABEL}`,
        content: "ManageNavi",
        prop: { test: d.NAVI_NAME }
      });
      //console.log("edit", d.NAVI_ID);
    },
    deleteRow(d) {
      console.log("delete", d.NAVI_ID);
    },
    validRow(d) {
      if (typeof d.NAVI_ID == "undefined") {
        return false;
      }
      return true;
    },
    arrangeData(d) {
      var newD = {};
      newD.NAVI_ID = d.NAVI_ID;
      newD.NAVI_LABEL = d.NAVI_LABEL;
      newD.NAVI_URL = d.NAVI_URL;
      newD.NAVI_VER = d.NAVI_VER;
      newD.NAVI_NAME = d.NAVI_NAME;
      newD.NAVI_PARENT_NAME = d.NAVI_PARENT_NAME;
      return newD;
    },
    renderColumn(key, col) {
      if (["NAVI_ID", "NAVI_LABEL", "NAVI_VER"].indexOf(key) >= 0) {
        return `<td>${col}</td>`;
      }

      if (["NAVI_URL", "NAVI_NAME", "NAVI_PARENT_NAME"].indexOf(key) >= 0) {
        return `<td>${this.getFixSize(col)}</td>`;
      }
      return false;
    }
  }
};
</script>
