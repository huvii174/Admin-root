<template>
<div class="app-container">
  <a-form :form="form" @submit="handleSubmit">
    <h2> Owner information </h2>
    <a-form-item v-bind="formItemLayout" label="Owner name">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid !',
              },
              {
                required: true,
                message: 'Please input your name!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <h2> Store information </h2>
    <a-form-item v-bind="formItemLayout" label="Shop Name">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid!',
              },
              {
                required: true,
                message: 'Please input your Shop Name!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
     <a-form-item v-bind="formItemLayout" label="Shop Address">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid!',
              },
              {
                required: true,
                message: 'Please input your address!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Open time">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid!',
              },
              {
                required: true,
                message: 'Please input!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Average price">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid!',
              },
              {
                required: true,
                message: 'Please input!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="WIFI">
      <a-switch v-decorator="['WIFI', { valuePropName: 'checked' }]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Smoking area">
      <a-switch v-decorator="['Smoking area', { valuePropName: 'checked' }]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Booking">
      <a-switch v-decorator="['Booking', { valuePropName: 'checked' }]" />
    </a-form-item>
    <a-form-item  v-bind="formItemLayout" label="Parking Scale">
      <a-input-number v-decorator="['parking-scale', { initialValue: 3 }]" :min="1" :max="100" />
      <span class="ant-form-text">
        slots
      </span>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Description">
      <a-input
        v-decorator="[
          'text',
          {
            rules: [
              {
                type: 'text',
                message: 'The input is not valid!',
              },
              {
                required: true,
                message: 'Please input!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Contract term">
      <a-range-picker v-decorator="['contract-term', rangeConfig]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Payment Method">
      <a-checkbox-group
        v-decorator="['payment-method', { initialValue: ['card', 'cash'] }]"
        style="width: 100%;"
      >
        <a-row>
          <a-col :span="8">
            <a-checkbox value="card">
              Card
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox disabled value="cash">
              Cash
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="VISA">
              VISA
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="MOMO">
              MOMO
            </a-checkbox>
          </a-col>
          <a-col :span="8">
            <a-checkbox value="Airpay">
              Airpay
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Website">
      <a-auto-complete
        v-decorator="['website', { rules: [{ required: true, message: 'Please input website!' }] }]"
        placeholder="website"
        @change="handleWebsiteChange"
      >
        <template slot="dataSource">
          <a-select-option v-for="website in autoCompleteResult" :key="website">
            {{ website }}
          </a-select-option>
        </template>
        <a-input />
      </a-auto-complete>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Upload Image" extra="Cover Image">
      <a-upload
        v-decorator="[
          'cover-image',
          {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          },
        ]"
        name="logo"
        action="/upload.do"
        list-type="picture"
      >
        <a-button> <a-icon type="upload" /> Click to upload </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
        I have read the
        <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">
        Register
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      confirmDirty: false,
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      },
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 16 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 16,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    }
  },
  normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
      }
      this.autoCompleteResult = autoCompleteResult
    }
  }
}
</script>
