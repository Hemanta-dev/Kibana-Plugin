# Kibana Plugin 7.9.1 Development README

This README provides instructions for developing a Kibana plugin using Kibana version 7.9.1 and Elasticsearch version 7.9.1.

## Prerequisites

Before you begin, ensure that you have the following prerequisites installed:

- Node.js (version 10.15.2 or later)
- Yarn (version 1.21 or later)

## Setting up the Development Environment

1. Clone the Kibana repository:

   ```shell
   git clone https://github.com/elastic/kibana.git
   ```

2. Navigate to the Kibana directory:

   ```shell
   cd kibana
   ```

3. Checkout the appropriate branch/tag for Kibana 7.9.1:

   ```shell
   git checkout 7.9.1
   ```

4. Install the project dependencies:

   ```shell
   yarn kbn bootstrap
   ```

5. Generate a new plugin using the provided script:

   ```shell
   node scripts/generate_plugin my_plugin_name
   ```

   Replace `my_plugin_name` with the desired name for your plugin.

6. Navigate to the newly generated plugin directory:

   ```shell
   cd plugins/my_plugin_name
   ```

7. Install the plugin dependencies:

   ```shell
   yarn kbn bootstrap
   ```

## Developing the Plugin

1. Start Kibana in development mode:

   ```shell
   yarn start
   ```

   This command will build the plugin and start Kibana with hot-reloading enabled.

2. Open your browser and navigate to `http://localhost:5601` to access the Kibana development instance.

3. Make changes to your plugin code. Kibana will automatically rebuild and reload the plugin whenever you save a file.

4. Test your plugin by interacting with it in the Kibana UI.

## Packaging the Plugin

When you are ready to package your plugin for distribution, follow these steps:

1. Build the plugin:

   ```shell
   yarn build or yarn dev:setup
   ```

   This command will create a distributable version of your plugin in the `target` directory.

2. The generated plugin ZIP file can be found at `target/my_plugin_name-x.x.x.zip`, where `x.x.x` represents the plugin version.

## Contributing

If you would like to contribute to Kibana, please refer to the [CONTRIBUTING.md](https://github.com/elastic/kibana/blob/7.9/CONTRIBUTING.md) file in the Kibana repository for guidelines and instructions.

## License

This project is licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Contact

For any questions or feedback regarding this plugin, feel free to contact the plugin maintainer or the Kibana community.

---

Please note that the provided instructions assume that you have cloned the official Kibana repository. If you are using a different project structure or repository, make sure to adjust the paths and commands accordingly.