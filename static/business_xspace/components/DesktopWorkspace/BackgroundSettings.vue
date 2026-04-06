<template>
  <div class="background-settings">
    <h3>桌面背景设置</h3>
    
    <!-- 背景类型选择 -->
    <div class="background-settings__type">
      <label>背景类型：</label>
      <div class="background-settings__type__options">
        <label class="background-settings__type__option">
          <input type="radio" v-model="backgroundType" value="default" />
          <span>默认背景</span>
        </label>
        <label class="background-settings__type__option">
          <input type="radio" v-model="backgroundType" value="custom" />
          <span>自定义图片</span>
        </label>
        <label class="background-settings__type__option">
          <input type="radio" v-model="backgroundType" value="color" />
          <span>纯色背景</span>
        </label>
      </div>
    </div>
    
    <!-- 自定义图片上传 -->
    <div v-if="backgroundType === 'custom'" class="background-settings__upload">
      <label>上传背景图片：</label>
      <input type="file" accept="image/*" @change="handleImageUpload" />
      <div v-if="backgroundUrl" class="background-settings__preview">
        <img :src="backgroundUrl" alt="背景预览" />
      </div>
    </div>
    
    <!-- 纯色背景选择 -->
    <div v-if="backgroundType === 'color'" class="background-settings__color">
      <label>选择颜色：</label>
      <input type="color" v-model="backgroundColor" />
    </div>
    
    <!-- 预设背景 -->
    <div class="background-settings__presets">
      <label>预设背景：</label>
      <div class="background-settings__presets__grid">
        <div 
          v-for="(preset, index) in presetBackgrounds" 
          :key="index"
          class="background-settings__presets__item"
          :style="{ backgroundImage: `url(${preset})` }"
          @click="selectPresetBackground(preset)"
        ></div>
      </div>
    </div>
    
    <!-- 透明度调整 -->
    <div class="background-settings__opacity">
      <label>透明度：{{ Math.round(backgroundOpacity * 100) }}%</label>
      <input type="range" v-model.number="backgroundOpacity" min="0" max="1" step="0.1" />
    </div>
    
    <!-- 应用按钮 -->
    <div class="background-settings__actions">
      <button @click="applySettings" class="background-settings__actions__button">
        应用设置
      </button>
      <button @click="cancel" class="background-settings__actions__button background-settings__actions__button--secondary">
        取消
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL, closeModal, desktopId, onSave }) {
  return {
    data() {
      const vm = this;
      const currentDesktop = this.system.desktops.find(d => d.id === desktopId);
      const background = currentDesktop ? currentDesktop.background : {
        type: 'default',
        url: '',
        color: '#f0f2f5',
        opacity: 1
      };
      
      return {
        backgroundType: background.type,
        backgroundUrl: background.url,
        backgroundColor: background.color,
        backgroundOpacity: background.opacity,
        presetBackgrounds: [
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal%20abstract%20background%20with%20soft%20colors&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20landscape%20with%20mountains%20and%20sky&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20geometric%20pattern%20background&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20night%20sky%20with%20stars&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=soft%20gradient%20background%20with%20pastel%20colors&image_size=landscape_16_9',
          'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20digital%20art%20background&image_size=landscape_16_9'
        ]
      };
    },
    methods: {
      handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.backgroundUrl = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      selectPresetBackground(url) {
        this.backgroundType = 'custom';
        this.backgroundUrl = url;
      },
      applySettings() {
        const background = {
          type: this.backgroundType,
          url: this.backgroundUrl,
          color: this.backgroundColor,
          opacity: this.backgroundOpacity
        };
        
        this.system.updateDesktopBackground(desktopId, background);
        
        if (onSave) {
          onSave(background);
        }
        
        closeModal();
      },
      cancel() {
        closeModal();
      }
    }
  };
}
</script>

<style lang="less">
.background-settings {
  padding: 20px;
  max-width: 600px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;
  }
  
  &__type {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    &__options {
      display: flex;
      gap: 20px;
      
      &__option {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
      }
    }
  }
  
  &__upload {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    &__preview {
      margin-top: 10px;
      max-width: 100%;
      
      img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
      }
    }
  }
  
  &__color {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    input {
      width: 100px;
      height: 40px;
      border: none;
      cursor: pointer;
    }
  }
  
  &__presets {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    &__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      
      &__item {
        width: 100%;
        height: 80px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
  
  &__opacity {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
    }
    
    input {
      width: 100%;
    }
  }
  
  &__actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    
    &__button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      
      &--secondary {
        background-color: #f0f2f5;
        color: #333;
      }
      
      &:not(&--secondary) {
        background-color: #3182ce;
        color: white;
      }
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>